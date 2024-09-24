import { LOCAL_USER } from '@/constants/localStorage'
import { useCommentForm } from '@/hooks/useCommentForm'
import { getItem } from '@/utils/localStorage'
import { Button, DialogActions, TextField } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

interface FormAddCommentProps {
	onSubmit: SubmitHandler<{
		comment: string
		username: string
		fullName: string
	}>
	onClose: () => void
}

const FormAddComment = ({ onSubmit, onClose }: FormAddCommentProps) => {
	const { register, handleSubmit, errors, setValue } = useCommentForm(onSubmit)
	useEffect(() => {
		const savedUser = JSON.parse(getItem(LOCAL_USER) || '{}')
		if (savedUser.username) {
			setValue('username', savedUser.username)
		}
		if (savedUser.fullName) {
			setValue('fullName', savedUser.fullName)
		}
	}, [setValue])
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				margin='dense'
				label='Full Name'
				type='text'
				fullWidth
				variant='outlined'
				{...register('fullName', {
					required: 'Full Name is required',
					minLength: {
						value: 3,
						message: 'Full Name must be at least 3 characters',
					},
					maxLength: {
						value: 30,
						message: 'Full Name cannot exceed 30 characters',
					},
				})}
				error={!!errors.fullName}
				helperText={errors.fullName?.message}
			/>
			<TextField
				margin='dense'
				label='Username'
				type='text'
				fullWidth
				variant='outlined'
				{...register('username', {
					required: 'Username is required',
					minLength: {
						value: 3,
						message: 'Username must be at least 3 characters',
					},
					maxLength: {
						value: 18,
						message: 'Username cannot exceed 18 characters',
					},
				})}
				error={!!errors.username}
				helperText={errors.username?.message}
			/>
			<TextField
				margin='dense'
				label='Comment'
				type='text'
				fullWidth
				variant='outlined'
				{...register('comment', {
					required: 'Comment is required',
					minLength: {
						value: 10,
						message: 'Comment must be at least 10 characters',
					},
					maxLength: {
						value: 100,
						message: 'Comment cannot exceed 100 characters',
					},
				})}
				error={!!errors.comment}
				helperText={errors.comment?.message}
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
