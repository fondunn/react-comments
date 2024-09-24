import { addComment, Comment } from '@/features/comments/commentsSlice'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { getNumberId } from '@/utils/getNumberId'
import { useState } from 'react'

export const useAddButton = () => {
	const { typedDispatch } = useTypedDispatch()
	const [isDialogOpen, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const commentId = getNumberId()
	const postId = getNumberId()
	const userId = getNumberId()

	const handleAddComment = (data: {
		comment: string
		fullName: string
		username: string
	}) => {
		const newComment: Comment = {
			id: commentId,
			body: data.comment,
			postId: postId,
			user: {
				id: userId,
				fullName: data.fullName,
				username: data.username,
			},
			likes: 0,
		}
		typedDispatch(addComment(newComment))
		handleClose()
	}

	return {
		isDialogOpen,
		handleClickOpen,
		handleAddComment,
		handleClose,
	}
}
