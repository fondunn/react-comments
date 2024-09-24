import { Add } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, Fab } from '@mui/material'

import FormAddComment from '../FormAddComment'
import { useAddButton } from './hooks/useAddButton'

const ButtonAddComment = () => {
	const { isDialogOpen, handleClickOpen, handleClose, handleAddComment } =
		useAddButton()

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
				onClick={handleClickOpen}
				sx={{
					ml: 'auto',
				}}
			>
				<Add />
			</Fab>

			<Dialog open={isDialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
				<DialogTitle sx={{ color: '#000' }}>Add a Comment</DialogTitle>
				<DialogContent>
					<FormAddComment onSubmit={handleAddComment} onClose={handleClose} />
				</DialogContent>
			</Dialog>
		</Box>
	)
}

export default ButtonAddComment
