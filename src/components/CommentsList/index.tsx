import type { AppDispatch } from '@/app/store'
import {
	fetchComments,
	selectComments,
} from '@/features/comments/commentsSlice'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentItem from '../Comment'

const CommentsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const { comments, status, error } = useSelector(selectComments)
	const { restoreScrollPosition } = useScrollRestoration()
	useEffect(() => {
		dispatch(fetchComments())
	}, [dispatch])

	useEffect(() => {
		if (status === 'succeeded') {
			restoreScrollPosition()
		}
	}, [status])

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>
	}

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{comments.map(comment => (
				<CommentItem comment={comment} key={comment.id} />
			))}
		</Container>
	)
}

export default CommentsList
