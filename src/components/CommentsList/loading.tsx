import { Container } from '@mui/material'
import CommentItemSkeleton from '../CommentItem/skeleton'

const Loading = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flex: 1,
				width: '100%',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{Array.from({ length: 5 }).map((_, idx) => {
				const opacity = 1 - idx * 0.2
				return <CommentItemSkeleton key={idx} opacity={opacity} />
			})}
		</Container>
	)
}

export default Loading
