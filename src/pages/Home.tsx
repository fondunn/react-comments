import ButtonAddComment from '@/components/ButtonAddComment'
import CommentsList from '@/components/CommentsList'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import styles from '@/styles/home.module.scss'
import MainLayout from '@/ui/MainLayout'

const HomePage = () => {
	useScrollPosition()

	return (
		<MainLayout>
			<h1 className={styles.title}>React Comments</h1>

			<CommentsList />

			<ButtonAddComment />
		</MainLayout>
	)
}

export default HomePage
