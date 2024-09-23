import { LOCAL_SCROLL_POSITION } from '@/constants/localStorage'
import { debounce } from 'lodash'
import { useEffect } from 'react'

export const useScrollPosition = (delay = 500) => {
	useEffect(() => {
		const handleScroll = debounce(() => {
			const scrollPosition = window.scrollY
			localStorage.setItem(
				LOCAL_SCROLL_POSITION,
				JSON.stringify(scrollPosition)
			)
		}, delay)

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [delay])
}
