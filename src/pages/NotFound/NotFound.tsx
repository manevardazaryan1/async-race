import { Box, Typography } from '@mui/material'
import './NotFound.css'

const NotFound = () => {
  return (
    <Box className='not-found'>
      <Typography variant='h5' gutterBottom>
        404
      </Typography>
    </Box>
  )
}

export default NotFound
