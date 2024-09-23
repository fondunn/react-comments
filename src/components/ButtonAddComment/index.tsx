import { AppDispatch } from '@/app/store'
import { addComment, Comment } from '@/features/comments/commentsSlice'
import { getNumberId } from '@/utils/getNumberId'
import { Add } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, Fab } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FormAddComment from '../FormAddComment'

const ButtonAddComment = () => {
	const dispatch: AppDispatch = useDispatch()
	const [open, setOpen] = useState(false)

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
	return (
		<Box
			sx={{
				position: 'sticky',
				bottom: '1rem',
				right: '1rem',
				display: 'flex',
			}}
		>
			<Fab
				color='primary'
				aria-label='add'
				onClick={handleClickOpen}
				sx={{
					ml: 'auto',
				}}
			>
				<Add />
			</Fab>

			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
				<DialogTitle sx={{ color: '#000' }}>Add a Comment</DialogTitle>
				<DialogContent>
					<FormAddComment onSubmit={handleAddComment} onClose={handleClose} />
				</DialogContent>
			</Dialog>
		</Box>
	)
}

export default ButtonAddComment
