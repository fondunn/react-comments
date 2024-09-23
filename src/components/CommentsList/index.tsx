import type { AppDispatch } from '@/app/store'
import {
	fetchComments,
	selectComments,
} from '@/features/comments/commentsSlice'
import { List, ListItem } from '@mui/material'
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
		<List>
			{comments.map(comment => (
				<ListItem key={comment.id}>
					<CommentItem comment={comment} />
				</ListItem>
			))}
		</List>
	)
}

export default CommentsList
