import { Typography } from '@mui/material'
import useGarage from '../../hooks/garage/useGarage'
import useRace from '../../hooks/garage/useRace'
import { STATUS, GARAGE_VIEW_NAME } from '../../constants/app'
import Cars from '../../components/Car/Cars'
import CreationEditionPanel from '../../components/Car/CreationEditionPanel'
import RacePanel from '../../components/Car/RacePanel'
import Pagination from '../../shared/ui/Pagination'

const Garage = () => {
  const {
    cars,
    carRefs,
    totalCount,
    status,
    editingCar,
    page,
    totalPages,
    handleDelete,
    handleEdit,
    completeEdit,
    handlePageChange,
  } = useGarage()

  const { handleDrive, handleStop, isRacing, isSingleRacing, isUpdating } = useRace()
  return (
    <>
      <Typography variant='h2' component='h1'>
        {GARAGE_VIEW_NAME}
      </Typography>
      {totalCount === 0 && status === STATUS.SUCCEEDED && (
        <Typography variant='h5' gutterBottom>
          No cars available
        </Typography>
      )}
      <RacePanel cars={cars} carRefs={carRefs} />
      <CreationEditionPanel editingCar={editingCar} onCompleteEdit={completeEdit} />
      <Cars
        cars={cars}
        carRefs={carRefs}
        totalCount={totalCount}
        status={status}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDrive={handleDrive}
        handleStop={handleStop}
      />
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          handlePageChange={handlePageChange}
          disabled={isRacing || isSingleRacing || isUpdating}
        />
      )}
    </>
  )
}

export default Garage
