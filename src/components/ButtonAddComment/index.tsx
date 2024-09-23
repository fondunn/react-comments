import { Add } from '@mui/icons-material'
import { Box, Fab } from '@mui/material'

const ButtonAddComment = () => {
	return (
		<Box
			sx={{
				position: 'sticky',
				bottom: '1rem',
				right: '1rem',
				display: 'flex',
			}}
		>
			<Fab
				color='primary'
				aria-label='add'
				sx={{
					ml: 'auto',
				}}
			>
				<Add />
			</Fab>
		</Box>
	)
}

export default ButtonAddComment
