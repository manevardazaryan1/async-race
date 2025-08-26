import { memo } from 'react'
import { ListItem, Box } from '@mui/material'
import type { CarPanelProps } from '../../types/Garage'
import { Button } from '../../shared/ui/Button'
import useCar from '../../hooks/garage/useCar'

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
        <Button
          customType='secondary'
          customVariant='outlined'
          customSize='small'
          onClick={() => handleEdit(car)}
          disabled={isRacing || isSingleRacing}
        >
          U
        </Button>
        <Button
          customType='secondary'
          customVariant='outlined'
          customSize='small'
          onClick={() => handleDelete(car.id)}
          disabled={isRacing || isSingleRacing}
        >
          R
        </Button>
        <Button
          customType='secondary'
          customVariant='outlined'
          customSize='small'
          onClick={() => handleDrive({ id: car.id, carRefs })}
          disabled={isRacing || isSingleRacing || isUpdating}
        >
          D
        </Button>
        <Button
          customType='secondary'
          customVariant='outlined'
          customSize='small'
          onClick={() => handleStop({ id: car.id, carRefs })}
          disabled={isRacing || !carsDrivingState[car.id]}
        >
          P
        </Button>
        <Box
          ref={(el: HTMLDivElement | null) => {
            carRefs.current[car.id] = el
          }}
          style={{ backgroundColor: car.color, padding: '5px', width: '100px' }}
        >
          {car.name} - <span style={{ color: car.color }}></span>
        </Box>
      </ListItem>
    </>
  )
}

export default memo(Car)
