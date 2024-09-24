import {
	fetchComments,
	selectComments,
} from '@/features/comments/commentsSlice'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CommentItem from '../CommentItem'
import Failed from './failed'
import Loading from './loading'

const CommentsList: React.FC = () => {
	const { typedDispatch } = useTypedDispatch()
	const { comments, status } = useSelector(selectComments)
	const { restoreScrollPosition } = useScrollRestoration()
	useEffect(() => {
		typedDispatch(fetchComments())
	}, [typedDispatch])

	useEffect(() => {
		if (status === 'succeeded') {
			restoreScrollPosition()
		}
	}, [status])

	switch (status) {
		case 'loading':
			return <Loading />
		case 'failed':
			return <Failed />
		case 'succeeded':
			return (
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						flex: 1,
					}}
				>
					{comments.map(comment => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</Container>
			)
		default:
			return null
	}
}

export default CommentsList
