import ButtonAddComment from '@/components/ButtonAddComment'
import CommentsList from '@/components/CommentsList'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import styles from '@/styles/home.module.scss'
import MainLayout from '@/ui/MainLayout'
// import { useScrollRestoration } from '@tanstack/react-router'
const HomePage = () => {
	useScrollPosition()

	return (
		<MainLayout>
			<h1 className={styles.title}>React Comments</h1>
			<div>
				<CommentsList />
			</div>
			<ButtonAddComment />
		</MainLayout>
	)
}

export default HomePage
