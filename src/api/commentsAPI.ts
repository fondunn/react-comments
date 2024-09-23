import {
	LOCAL_COMMENTS,
	LOCAL_DELETED_COMMENTS,
} from '@/constants/localStorage'
import { getNumberId } from '@/utils/getNumberId'
import { getItem, setItem } from '@/utils/localStorage'
import { Comment } from '../features/comments/commentsSlice'

const BASE_URL = 'https://dummyjson.com/comments'

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
		createdComment.id = getNumberId()
		createdComment.likes = 0

		const localComments = await getLocalComments()
		setItem(LOCAL_COMMENTS, JSON.stringify([...localComments, createdComment]))

		return createdComment
	} catch (error) {
		console.error('Error adding comment:', error)
		return null
	}
}

const deleteComment = async (id: number): Promise<void> => {
	try {
		await deleteCommentFromServer(id)
		const deletedComments = await getDeletedComments()

		setItem(LOCAL_DELETED_COMMENTS, JSON.stringify([...deletedComments, id]))
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
	const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
	if (!response.ok) {
		throw new Error('Failed to delete comment from the server')
	}
}

export default {
	getComments,
	addComment,
	deleteComment,
}
