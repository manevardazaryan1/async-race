import { useEffect, useState, memo } from 'react'
import { Typography } from '@mui/material'
import useRace from '../../hooks/garage/useRace'
import type { RacePanelProps } from '../../types/Garage'
import { Button } from '../../shared/ui/Button'
import Modal from '../../shared/ui/Modal'

const RacePanel = ({ cars, carRefs }: RacePanelProps) => {
  const {
    messageForRaceResult,
    messageForWinner,
    isRacing,
    isUpdating,
    isSingleRacing,
    handleReset,
    handleRace,
  } = useRace()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (messageForWinner) {
      setIsOpen(true)
    }
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }, [messageForWinner])
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
        disabled={!isRacing}
      >
        Reset
      </Button>
      <Button
        customType='secondary'
        customVariant='outlined'
        customSize='small'
        onClick={() => handleRace({ cars, carRefs })}
        disabled={isRacing || isSingleRacing || isUpdating}
      >
        Race
      </Button>
      <Modal isOpen={isOpen}>{messageForWinner}</Modal>
    </>
  )
}

export default memo(RacePanel)
