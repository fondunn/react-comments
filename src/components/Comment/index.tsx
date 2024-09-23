import { Comment } from '@/features/comments/commentsSlice'

interface Props {
	comment: Comment
}

const CommentItem = ({ comment }: Props) => {
	return (
		<li key={comment.id}>
			<strong>{comment.user.fullName}</strong>: {comment.body} (Likes:{' '}
			{comment.likes})
		</li>
	)
}
export default CommentItem
