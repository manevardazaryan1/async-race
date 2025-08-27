import { memo } from 'react'
import { ListItem, Box } from '@mui/material'
import type { CarPanelProps } from '../../types/Garage'
import { Button } from '../../shared/ui/Button'
import useCar from '../../hooks/garage/useCar'
import CarSvg from './CarSvg'

const Car = ({
  car,
  carRefs,
  handleEdit,
  handleDelete,
  handleDrive,
  handleStop,
}: CarPanelProps) => {
  const { isRacing, isUpdating, carsDrivingState, isSingleRacing } = useCar()
  return (
    <>
      <ListItem key={car.id}>
        <Box className='car-control-box'>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='small'
            onClick={() => handleEdit(car)}
            disabled={isRacing || isSingleRacing}
            className='car-control-button'
          >
            U
          </Button>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='small'
            onClick={() => handleDelete(car.id)}
            disabled={isRacing || isSingleRacing}
            className='car-control-button'
          >
            R
          </Button>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='small'
            onClick={() => handleDrive({ id: car.id, carRefs })}
            disabled={isRacing || isSingleRacing || isUpdating}
            className='car-control-button'
          >
            D
          </Button>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='small'
            onClick={() => handleStop({ id: car.id, carRefs })}
            disabled={isRacing || !carsDrivingState[car.id]}
            className='car-control-button'
          >
            P
          </Button>
        </Box>
        <Box className='car-box'>
          <Box
            ref={(el: HTMLDivElement | null) => {
              carRefs.current[car.id] = el
            }}
            className='car-icon'
          >
            <CarSvg color={car.color} size={70} />
          </Box>
          <Box className='car-name' style={{ color: car.color }}>
            {car.name}
          </Box>
        </Box>
      </ListItem>
    </>
  )
}

export default memo(Car)
