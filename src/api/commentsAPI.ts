import {
	LOCAL_COMMENTS,
	LOCAL_DELETED_COMMENTS,
	LOCAL_USER,
} from '@/constants/localStorage'
import { getNumberId } from '@/utils/getNumberId'
import { getItem, setItem } from '@/utils/localStorage'
import { Comment } from '../features/comments/commentsSlice'

const BASE_URL = 'https://dummyjson.com/comments'
const API_LIMIT = 340
const getComments = async (): Promise<Comment[]> => {
	try {
		const [serverComments, localComments, deletedComments] = await Promise.all([
			fetchCommentsFromServer(),
			getLocalComments(),
			getDeletedComments(),
		])

		const allComments = [...serverComments, ...localComments]

		return allComments.filter(comment => !deletedComments.includes(comment.id))
	} catch (error) {
		console.error('Error fetching comments:', error)
		return []
	}
}

const addComment = async (newComment: Comment): Promise<Comment | null> => {
	try {
		const createdComment = await postCommentToServer(newComment)

		const updatedComment = applyFakeUser({ createdComment, newComment })
		await updateCredentials({
			username: updatedComment.user.username,
			fullName: updatedComment.user.fullName,
		})
		const localComments = await getLocalComments()
		setItem(LOCAL_COMMENTS, JSON.stringify([...localComments, updatedComment]))

		return updatedComment
	} catch (error) {
		console.error('Error adding comment:', error)
		return null
	}
}

const deleteComment = async (id: number): Promise<void> => {
	try {
		await deleteCommentFromServer(id)

		const deletedComments = await getDeletedComments()

		if (id > API_LIMIT) {
			await handleLocalCommentDeletion(id, deletedComments)
		} else {
			await handleServerCommentDeletion(deletedComments, id)
		}
	} catch (error) {
		console.error('Error deleting comment:', error)
	}
}

const fetchCommentsFromServer = async (): Promise<Comment[]> => {
	const response = await fetch(BASE_URL)
	if (!response.ok) {
		throw new Error('Failed to fetch comments from the server')
	}
	const data = await response.json()
	return data.comments || []
}

const getLocalComments = async (): Promise<Comment[]> => {
	return JSON.parse(getItem(LOCAL_COMMENTS) || '[]')
}

const getDeletedComments = async (): Promise<number[]> => {
	return JSON.parse(getItem(LOCAL_DELETED_COMMENTS) || '[]')
}

const postCommentToServer = async (comment: Comment): Promise<Comment> => {
	const response = await fetch(`${BASE_URL}/add`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ body: comment.body, postId: 3, userId: 5 }),
	})

	if (!response.ok) {
		throw new Error('Failed to add comment to the server')
	}

	return response.json()
}

const deleteCommentFromServer = async (id: number): Promise<void> => {
	const idToDelete = getId(id)
	const response = await fetch(`${BASE_URL}/${idToDelete}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error('Failed to delete comment from the server')
	}
}

const applyFakeUser = ({
	createdComment,
	newComment,
}: {
	createdComment: Comment
	newComment: Comment
}) => {
	return {
		...createdComment,
		user: {
			...createdComment.user,
			username: newComment.user.username,
			fullName: newComment.user.fullName,
		},
		id: getNumberId(),
		likes: 0,
	}
}

const getId = (id: number) => {
	if (id > API_LIMIT) return API_LIMIT
	else return id
}

const updateCredentials = async ({
	username,
	fullName,
}: {
	username: string
	fullName: string
}): Promise<void> => {
	try {
		const savedUser = JSON.parse(
			getItem(LOCAL_USER) || JSON.stringify({ username: '', fullName: '' })
		) as { username: string; fullName: string }

		if (savedUser.username === username && savedUser.fullName === fullName) {
			return
		}

		savedUser.username = username
		savedUser.fullName = fullName

		setItem(LOCAL_USER, JSON.stringify(savedUser))
	} catch (error) {
		console.error('Error updating user credentials:', error)
	}
}

const handleLocalCommentDeletion = async (
	id: number,
	deletedComments: number[]
): Promise<void> => {
	const comments = await getLocalComments()
	const updatedComments = comments.filter(
		(comment: Comment) => comment.id !== id
	)
	setItem(LOCAL_COMMENTS, JSON.stringify(updatedComments))

	const filteredComments = deletedComments.filter(comment => comment !== id)
	setItem(LOCAL_DELETED_COMMENTS, JSON.stringify(filteredComments))
}

const handleServerCommentDeletion = async (
	deletedComments: number[],
	id: number
): Promise<void> => {
	setItem(LOCAL_DELETED_COMMENTS, JSON.stringify([...deletedComments, id]))
}

export default {
	getComments,
	addComment,
	deleteComment,
}
