import { Container } from '@mui/material'

const Failed = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flex: 1,
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			Oops... Something went wrong...
		</Container>
	)
}

export default Failed
