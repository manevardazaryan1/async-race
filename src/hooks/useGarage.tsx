import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import type { RootState, AppDispatch } from '../redux/store/store'
import type { Car } from '../types/Garage'
import { getCarsAsync, deleteCarAsync } from '../services/garage'
import { GARAGE_VIEW_PAGE_SIZE } from '../constants/api'
import { calculateTotalPages } from '../utils/helpers'

const useGarage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cars, totalCount, status, creationStatus } = useSelector(
    (state: RootState) => state.garage,
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [page, setPage] = useState<number>(() => {
    return Number(searchParams.get('page')) || 1
  })

  useEffect(() => {
    setSearchParams({ page: page.toString() })
  }, [page, setSearchParams])

  const totalPages = calculateTotalPages(totalCount, GARAGE_VIEW_PAGE_SIZE)

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }, [])

  const handleDelete = (id: number) => {
    dispatch(deleteCarAsync(id))
  }

  const completeEdit = useCallback(() => {
    setEditingCar(null)
  }, [])

  const handleEdit = (car: Car) => {
    setEditingCar(car)
  }

  useEffect(() => {
    dispatch(getCarsAsync({ page }))
    setSearchParams({ page: page.toString() })

    if (cars.length === 0 && totalPages > 0) {
      setPage(totalPages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, totalCount, page])

  return {
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
  }
}

export default useGarage
