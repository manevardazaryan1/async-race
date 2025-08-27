import { memo } from 'react'
import { List, Typography, Box } from '@mui/material'
import type { CarsPanelProps } from '../../types/Garage'
import { STATUS } from '../../constants/app'
import Car from './Car'

const Cars = ({
  cars,
  carRefs,
  totalCount,
  status,
  handleEdit,
  handleDelete,
  handleDrive,
  handleStop,
}: CarsPanelProps) => {
  return (
    <>
      {totalCount === 0 && status === STATUS.SUCCEEDED && (
        <Typography variant='h5' gutterBottom>
          No cars available
        </Typography>
      )}
      <Box className='cars-box'>
        <List className='cars-list'>
          {cars.map((car) => (
            <Car
              key={car.id}
              car={car}
              carRefs={carRefs}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDrive={handleDrive}
              handleStop={handleStop}
            />
          ))}
        </List>
      </Box>
    </>
  )
}

export default memo(Cars)
