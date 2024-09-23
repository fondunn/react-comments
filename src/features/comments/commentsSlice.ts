import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import commentsAPI from '../../api/commentsAPI'
import { RootState } from '../../app/store'

export interface Comment {
	id: number
	body: string
	postId: number
}

export interface CommentsState {
	comments: Comment[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: CommentsState = {
	comments: [],
	status: 'idle',
	error: null,
}

export const fetchComments = createAsyncThunk<Comment[], void>(
	'comments/fetchComments',
	async () => {
		const response = await commentsAPI.getComments()
		return response
	}
)

export const addComment = createAsyncThunk<Comment, Comment>(
	'comments/addComment',
	async newComment => {
		const response = await commentsAPI.addComment(newComment)
		return response
	}
)

export const deleteComment = createAsyncThunk<number, number>(
	'comments/deleteComment',
	async id => {
		await commentsAPI.deleteComment(id)
		return id
	}
)

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchComments.pending, state => {
				state.status = 'loading'
			})
			.addCase(
				fetchComments.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					state.status = 'succeeded'
					state.comments = action.payload
				}
			)
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Something went wrong'
			})
			.addCase(
				addComment.fulfilled,
				(state, action: PayloadAction<Comment>) => {
					state.comments.push(action.payload)
				}
			)
			.addCase(
				deleteComment.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.comments = state.comments.filter(
						comment => comment.id !== action.payload
					)
				}
			)
	},
})

export const selectComments = (state: RootState) => state.comments

export default commentsSlice.reducer
