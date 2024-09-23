import { Comment } from '@/features/comments/commentsSlice'
import { ListItemText } from '@mui/material'

interface Props {
	comment: Comment
}

const CommentItem = ({ comment }: Props) => {
	return (
		<ListItemText
			primary={<strong>{comment.user.fullName}</strong>}
			secondary={<div>{`${comment.body} (Likes: ${comment.likes})`}</div>}
		/>
	)
}
export default CommentItem
