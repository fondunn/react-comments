import { Container } from '@mui/material'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

const MainLayout = ({ children }: Props) => {
	return (
		<main>
			<Container
				maxWidth='md'
				sx={{
					position: 'relative',
					minHeight: '100svh',
					py: '1rem',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{children}
			</Container>
		</main>
	)
}

export default MainLayout
