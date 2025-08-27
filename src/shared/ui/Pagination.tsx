import { memo } from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import type { PaginationPanelProps } from '../../types/Ui'

const Pagination = ({ count, page, disabled, handlePageChange }: PaginationPanelProps) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={handlePageChange}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      disabled={disabled}
      className='pagination'
    />
  )
}

export default memo(Pagination)
