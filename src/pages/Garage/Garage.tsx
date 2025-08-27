import { Typography, Box } from '@mui/material'
import useGarage from '../../hooks/garage/useGarage'
import useRace from '../../hooks/garage/useRace'
import { STATUS, GARAGE_VIEW_NAME } from '../../constants/app'
import Cars from '../../components/Car/Cars'
import CreationEditionPanel from '../../components/Car/CreationEditionPanel'
import RacePanel from '../../components/Car/RacePanel'
import Loading from '../../components/Loading/Loading'
import Pagination from '../../shared/ui/Pagination'
import './Garage.css'

const Garage = () => {
  const {
    cars,
    carRefs,
    totalCount,
    status,
    fetchingStatus,
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
      {fetchingStatus === STATUS.LOADING && <Loading />}
      {totalCount === 0 && status === STATUS.SUCCEEDED && (
        <Box className='no-items-box'>
          <Typography variant='h5' gutterBottom>
            No cars available
          </Typography>
        </Box>
      )}
      <Box className='race-create-update-control-panel'>
        <RacePanel cars={cars} carRefs={carRefs} />
        <CreationEditionPanel editingCar={editingCar} onCompleteEdit={completeEdit} />
      </Box>
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
      <Box className='pagination-view-name-box'>
        <Box>
          <Typography variant='h2' component='h1' className='page-title'>
            {GARAGE_VIEW_NAME}({totalCount})
          </Typography>
        </Box>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            handlePageChange={handlePageChange}
            disabled={isRacing || isSingleRacing || isUpdating}
          />
        )}
      </Box>
    </>
  )
}

export default Garage
