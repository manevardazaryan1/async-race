import { List, ListItem, Typography, Pagination } from '@mui/material'
import { Button } from '../../shared/ui/Button'
import { STATUS, GARAGE_VIEW_NAME } from '../../constants/app'
import useGarage from '../../hooks/useGarage'
import CreationEditionPanel from '../../components/Car/CreationEditionPanel'

const Garage = () => {
  const {
    cars,
    totalCount,
    status,
    creationStatus,
    editingCar,
    page,
    totalPages,
    handleDelete,
    handleEdit,
    completeEdit,
    handlePageChange,
  } = useGarage()

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
      <CreationEditionPanel
        editingCar={editingCar}
        onCompleteEdit={completeEdit}
        status={creationStatus}
      />
      <List>
        {cars.map((car) => (
          <ListItem key={car.id}>
            {car.name} - <span style={{ color: car.color }}>{car.color}</span>
            <Button customType='secondary' customVariant='outlined' onClick={() => handleEdit(car)}>
              Update
            </Button>
            <Button
              customType='secondary'
              customVariant='outlined'
              onClick={() => handleDelete(car.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </>
  )
}

export default Garage
