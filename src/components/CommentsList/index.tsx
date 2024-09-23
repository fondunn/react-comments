import type { AppDispatch } from '@/app/store'
import {
	fetchComments,
	selectComments,
} from '@/features/comments/commentsSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentItem from '../Comment'

const CommentsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const { comments, status, error } = useSelector(selectComments)

	useEffect(() => {
		dispatch(fetchComments())
	}, [dispatch])

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>
	}

	return (
		<ul>
			{comments.map(comment => (
				<CommentItem comment={comment} />
			))}
		</ul>
	)
}

export default CommentsList
