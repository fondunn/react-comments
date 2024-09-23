import ButtonAddComment from '@/components/ButtonAddComment'
import CommentsList from '@/components/CommentsList'
import styles from '@/styles/home.module.scss'
import MainLayout from '@/ui/MainLayout'
const HomePage = () => {
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
