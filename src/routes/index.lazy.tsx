import { createLazyFileRoute } from '@tanstack/react-router'
import HomePage from '../pages/Home'

export const Route = createLazyFileRoute('/')({
	component: () => <HomePage />,
})
