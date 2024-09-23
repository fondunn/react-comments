import { useCommentForm } from '@/hooks/useCommentForm'
import { Button, DialogActions, TextField } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

interface FormAddCommentProps {
	onSubmit: SubmitHandler<{ comment: string }>
	onClose: () => void
}

const FormAddComment = ({ onSubmit, onClose }: FormAddCommentProps) => {
	const { register, handleSubmit } = useCommentForm(onSubmit)
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				margin='dense'
				label='Comment'
				type='text'
				fullWidth
				variant='outlined'
				{...register('comment', { required: true })}
			/>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Cancel
				</Button>
				<Button type='submit' color='primary'>
					Add
				</Button>
			</DialogActions>
		</form>
	)
}

export default FormAddComment
