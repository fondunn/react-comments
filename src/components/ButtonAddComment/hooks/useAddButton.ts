import { AppDispatch } from '@/app/store'
import { addComment, Comment } from '@/features/comments/commentsSlice'
import { getNumberId } from '@/utils/getNumberId'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useAddButton = () => {
	const dispatch: AppDispatch = useDispatch()
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

	const handleAddComment = (data: { comment: string }) => {
		const newComment: Comment = {
			id: commentId,
			body: data.comment,
			postId: postId,
			user: {
				id: userId,
				fullName: 'Emma Miller',
				username: 'emmaj',
			},
			likes: 0,
		}
		dispatch(addComment(newComment))
		handleClose()
	}

	return {
		isDialogOpen,
		handleClickOpen,
		handleAddComment,
		handleClose,
	}
}
