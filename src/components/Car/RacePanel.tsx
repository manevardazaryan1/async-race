import { Typography } from '@mui/material'
import type { RacePanelProps } from '../../types/Garage'
import useRace from '../../hooks/garage/useRace'
import { Button } from '../../shared/ui/Button'

const RacePanel = ({ cars, carRefs }: RacePanelProps) => {
  const { messageForRaceResult, handleReset, handleRace } = useRace()

  return (
    <>
      <Typography variant='h5' gutterBottom>
        {messageForRaceResult}
      </Typography>

      <Button
        customType='secondary'
        customVariant='outlined'
        customSize='small'
        onClick={() => handleReset({ cars, carRefs })}
      >
        Reset
      </Button>
      <Button
        customType='secondary'
        customVariant='outlined'
        customSize='small'
        onClick={() => handleRace({ cars, carRefs })}
      >
        Race
      </Button>
    </>
  )
}

export default RacePanel
