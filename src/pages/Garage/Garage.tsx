import { useRef } from 'react'
import { Typography } from '@mui/material'
import { STATUS, GARAGE_VIEW_NAME } from '../../constants/app'
import useGarage from '../../hooks/garage/useGarage'
import Cars from '../../components/Car/Cars'
import CreationEditionPanel from '../../components/Car/CreationEditionPanel'
import Pagination from '../../shared/ui/Pagination'
import RacePanel from '../../components/Car/RacePanel'

const Garage = () => {
  const {
    cars,
    totalCount,
    status,
    editingCar,
    page,
    totalPages,
    handleDelete,
    handleEdit,
    completeEdit,
    handlePageChange,
    handleDrive,
    handleStop,
  } = useGarage()
  const carRefs = useRef<Record<number, HTMLDivElement | null>>({})

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
      <Pagination count={totalPages} page={page} handlePageChange={handlePageChange} />
    </>
  )
}

export default Garage
