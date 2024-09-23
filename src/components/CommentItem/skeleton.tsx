import { Box, Skeleton, Typography } from '@mui/material'

const CommentItemSkeleton = ({ opacity }: { opacity: number }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				py: '1rem',
				px: '1rem',
				background: '#1c1917',
				borderRadius: '8px',
				width: '100%',
				opacity: opacity,
			}}
		>
			<Box sx={{ width: '100%' }}>
				<Typography variant='body1'>
					<Skeleton />
				</Typography>
				<Typography variant='body1'>
					<Skeleton />
				</Typography>
			</Box>
		</Box>
	)
}

export default CommentItemSkeleton
