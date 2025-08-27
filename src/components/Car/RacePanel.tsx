import { useEffect, useState, memo } from 'react'
import { Box } from '@mui/material'
import useRace from '../../hooks/garage/useRace'
import type { RacePanelProps } from '../../types/Garage'
import { Button } from '../../shared/ui/Button'
import Modal from '../../shared/ui/Modal'

const RacePanel = ({ cars, carRefs }: RacePanelProps) => {
  const { messageForWinner, isRacing, isUpdating, isSingleRacing, handleReset, handleRace } =
    useRace()
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
      <Box className='race-panel-box'>
        <Box className='race-control-box'>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='medium'
            onClick={() => handleReset({ cars, carRefs })}
            disabled={!isRacing}
            className='race-button'
          >
            Reset
          </Button>
          <Button
            customType='secondary'
            customVariant='outlined'
            customSize='medium'
            onClick={() => handleRace({ cars, carRefs })}
            disabled={isRacing || isSingleRacing || isUpdating}
            className='race-button'
          >
            Race
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen}>
        <Box className='message-for-winner'>{messageForWinner}</Box>
      </Modal>
    </>
  )
}

export default memo(RacePanel)
