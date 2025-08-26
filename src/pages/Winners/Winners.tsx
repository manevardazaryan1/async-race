import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material'
import { memo } from 'react'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import useWinners from '../../hooks/winners/useWinners'
import { STATUS, WINNERS_VIEW_NAME } from '../../constants/app'
import { WINNERS_ORDERING_TYPES, WINNERS_SORTING_TYPES } from '../../constants/api'
import Pagination from '../../shared/ui/Pagination'

const Winners = () => {
  const {
    data,
    totalCount,
    totalPages,
    status,
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

  if (totalCount === 0 && status === STATUS.SUCCEEDED) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant='h2' component='h1' gutterBottom>
          {WINNERS_VIEW_NAME}
        </Typography>
        <Typography variant='h5' color='text.secondary'>
          No winners available.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h2' component='h1' gutterBottom>
        {WINNERS_VIEW_NAME} ({totalCount})
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size='small'>
          <InputLabel>Sort by</InputLabel>
          <Select value={sort} label='Sort by' onChange={(e) => setSort(e.target.value)}>
            <MenuItem value={WINNERS_SORTING_TYPES.WINS}>{WINNERS_SORTING_TYPES.WINS}</MenuItem>
            <MenuItem value={WINNERS_SORTING_TYPES.TIME}>{WINNERS_SORTING_TYPES.TIME}</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={toggleOrder}>
          {order === WINNERS_ORDERING_TYPES.ASC ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
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
            {data.map((datum) => (
              <TableRow key={datum.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {datum.id}
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: datum.car?.color,
                      borderRadius: '50%',
                    }}
                  />
                </TableCell>
                <TableCell>{datum.car?.name}</TableCell>
                <TableCell>{datum.wins}</TableCell>
                <TableCell>{datum.time.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          handlePageChange={handlePageChange}
          disabled={false}
        />
      )}
    </Box>
  )
}

export default memo(Winners)
