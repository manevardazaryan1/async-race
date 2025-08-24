import { Pagination as MuiPagination } from '@mui/material'
import type { PaginationPanelProps } from '../../types/Ui'

const Pagination = ({ count, page, handlePageChange }: PaginationPanelProps) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={handlePageChange}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    />
  )
}

export default Pagination
