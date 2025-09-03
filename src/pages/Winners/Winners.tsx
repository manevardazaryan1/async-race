import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material'
import { memo } from 'react'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import useWinners from '../../hooks/winners/useWinners'
import { WINNERS_VIEW_NAME } from '../../constants/app'
import { WINNERS_ORDERING_TYPES, WINNERS_SORTING_TYPES } from '../../constants/api'
import Pagination from '../../shared/ui/Pagination'
import CarSvg from '../../components/Car/CarSvg'
import './Winners.css'

const Winners = () => {
  const {
    winners,
    cars,
    totalCount,
    totalPages,
    page,
    sort,
    order,
    setSort,
    setOrder,
    handlePageChange,
  } = useWinners()

  const toggleOrder = () => {
    if (order === WINNERS_ORDERING_TYPES.ASC) {
      setOrder(WINNERS_ORDERING_TYPES.DESC)
    } else {
      setOrder(WINNERS_ORDERING_TYPES.ASC)
    }
  }

  if (totalCount === 0) {
    return (
      <Box className='no-items-box'>
        <Typography variant='h5' color='text.secondary'>
          No winners available.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Box className='winners-box'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className='sort-order-box'>
          <FormControl size='small' className='sort-order-control'>
            <InputLabel>Sort by</InputLabel>
            <Select value={sort} label='Sort by' onChange={(e) => setSort(e.target.value)}>
              <MenuItem className='sort-select-item' value={WINNERS_SORTING_TYPES.WINS}>
                {WINNERS_SORTING_TYPES.WINS}
              </MenuItem>
              <MenuItem className='sort-select-item' value={WINNERS_SORTING_TYPES.TIME}>
                {WINNERS_SORTING_TYPES.TIME}
              </MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={toggleOrder} className='order-icon'>
            {order === WINNERS_ORDERING_TYPES.ASC ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </Box>
        <Box className='winners-table-box'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='winners table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Wins</TableCell>
                  <TableCell>Best Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {winners.map((datum) => (
                  <TableRow
                    key={datum.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {datum.id}
                    </TableCell>
                    <TableCell>
                      <CarSvg color={cars[datum.id]?.color} size={30} />
                    </TableCell>
                    <TableCell>{cars[datum.id]?.name}</TableCell>
                    <TableCell>{datum.wins}</TableCell>
                    <TableCell>{datum.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className='pagination-view-name-box'>
          <Typography variant='h2' component='h1' gutterBottom className='page-title'>
            {WINNERS_VIEW_NAME} ({totalCount})
          </Typography>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              handlePageChange={handlePageChange}
              disabled={false}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default memo(Winners)
