import { DebounceInput } from 'react-debounce-input'
import { Box, TextField, Typography, LinearProgress } from '@mui/material'
import { Button } from '../../shared/ui/Button'
import type { CarCreationEditionPanelProps } from '../../types/Garage'
import { GENERATED_RANDOM_CARS_COUNT } from '../../constants/app'
import useCreationEditionPanel from '../../hooks/garage/useCreationEditionPanel'
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

  return (
    <Box>
      <DebounceInput
        element={TextField}
        minLength={2}
        debounceTimeout={300}
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
        placeholder='Car Name'
      />
      <TextField type='color' value={color} onChange={handleColorChange} />
      <Button onClick={editingCar ? handleUpdate : handleCreate} disabled={!name}>
        {editingCar ? 'Update' : 'Create'}
      </Button>
      <Button onClick={() => handleGenerateRandomCars(GENERATED_RANDOM_CARS_COUNT)}>
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

export default CreationEditionPanel
