import { Comment } from '../features/comments/commentsSlice'

const BASE_URL = 'https://dummyjson.com/comments'

const getComments = async () => {
	const response = await fetch(BASE_URL)
	const data = await response.json()
	return data.comments
}

const addComment = async (newComment: Comment) => {
	const response = await fetch(BASE_URL + '/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newComment),
	})
	const data = await response.json()
	return data
}

const deleteComment = async (id: number) => {
	await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
	})
}

export default {
	getComments,
	addComment,
	deleteComment,
}
