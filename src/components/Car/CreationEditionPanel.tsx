import { memo } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Box, TextField, Typography, LinearProgress } from '@mui/material'
import useCreationEditionPanel from '../../hooks/garage/useCreationEditionPanel'
import useRace from '../../hooks/garage/useRace'
import { GENERATED_RANDOM_CARS_COUNT } from '../../constants/app'
import type { CarCreationEditionPanelProps } from '../../types/Garage'
import { Button } from '../../shared/ui/Button'
import Modal from '../../shared/ui/Modal'

const CreationEditionPanel = ({ editingCar, onCompleteEdit }: CarCreationEditionPanelProps) => {
  const {
    name,
    color,
    handleColorChange,
    handleNameChange,
    handleCreate,
    handleUpdate,
    handleKeyDown,
    handleGenerateRandomCars,
    isGenerating,
    progress,
  } = useCreationEditionPanel({ editingCar, onCompleteEdit })

  const { isRacing, isSingleRacing, isUpdating } = useRace()

  return (
    <Box className='create-update-box'>
      <Box className='create-update-car-box'>
        <DebounceInput
          element={TextField}
          minLength={2}
          debounceTimeout={300}
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          placeholder='Car Name'
          disabled={isRacing || isSingleRacing}
          className='create-update'
        />
        <TextField
          type='color'
          value={color}
          onChange={handleColorChange}
          disabled={isRacing || isSingleRacing}
          className='color'
        />
        <Button
          onClick={editingCar ? handleUpdate : handleCreate}
          disabled={!name || isRacing || isSingleRacing}
          className='update-create-button'
        >
          {editingCar ? 'Update' : 'Create'}
        </Button>
      </Box>
      <Button
        onClick={() => handleGenerateRandomCars(GENERATED_RANDOM_CARS_COUNT)}
        disabled={isRacing || isSingleRacing || isUpdating}
        className='generate-random-cars-button'
      >
        Generate Random Cars (100)
      </Button>

      <Modal isOpen={isGenerating}>
        <Box
          sx={{
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: '8px',
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography id='progress-modal-title' variant='h6' component='h2' mb={2}>
            Generating Cars...
          </Typography>
          <LinearProgress variant='determinate' value={progress} />
          <Typography mt={2}>{Math.round(progress)}%</Typography>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(CreationEditionPanel)
