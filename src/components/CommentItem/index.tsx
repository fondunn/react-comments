import { Comment, deleteComment } from '@/features/comments/commentsSlice'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
	comment: Comment
}

const CommentItem = ({ comment }: Props) => {
	const { typedDispatch } = useTypedDispatch()

	const handleDelete = (id: number) => {
		typedDispatch(deleteComment(id))
	}
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				py: '1rem',
				px: '1rem',
				background: '#1c1917',
				borderRadius: '8px',
			}}
		>
			<Box sx={{ width: '100%' }}>
				<Typography variant='body1'>{comment.user.fullName}</Typography>
				<Typography variant='body1'>{`${comment.body} (Likes: ${comment.likes})`}</Typography>
			</Box>

			<IconButton aria-label='delete' onClick={() => handleDelete(comment.id)}>
				<Delete />
			</IconButton>
		</Box>
	)
}
export default CommentItem
