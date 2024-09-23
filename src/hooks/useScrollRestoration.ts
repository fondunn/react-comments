import { LOCAL_SCROLL_POSITION } from '@/constants/localStorage'
import { useCallback } from 'react'

export const useScrollRestoration = () => {
	const restoreScrollPosition = useCallback(() => {
		const savedScrollPosition = localStorage.getItem(LOCAL_SCROLL_POSITION)
		if (savedScrollPosition) {
			window.scrollTo(0, JSON.parse(savedScrollPosition))
		}
	}, [])

	return { restoreScrollPosition }
}
