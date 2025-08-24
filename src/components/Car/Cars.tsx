import { List, Typography } from '@mui/material'
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
      <List>
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
    </>
  )
}

export default Cars
