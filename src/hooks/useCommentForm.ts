import { useForm } from 'react-hook-form'

interface FormData {
	username: string
	fullName: string
	comment: string
}

export const useCommentForm = (onSubmit: (data: FormData) => void) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const handleFormSubmit = (data: FormData) => {
		onSubmit(data)
		reset()
	}

	return {
		register,
		handleSubmit: handleSubmit(handleFormSubmit),
		errors,
	}
}
