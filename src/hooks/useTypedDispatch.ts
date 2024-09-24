import { AppDispatch } from '@/app/store'

import { useDispatch } from 'react-redux'

export const useTypedDispatch = () => {
	const typedDispatch: AppDispatch = useDispatch()
	return { typedDispatch }
}
