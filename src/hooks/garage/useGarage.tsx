import { useEffect, useState, useCallback, useRef } from 'react'
import { useAppDispatch } from '../app/useAppDispatch'
import { useAppSelector } from '../app/useAppSelector'
import { useSearchParams } from 'react-router-dom'
import type { Car } from '../../types/Garage'
import { setIsUpdating, selectCars, selectTotalCount } from '../../redux/slices/garage'
import { deleteWinnerAsync, getWinnerAsync } from '../../services/winners'
import { getCarsAsync, deleteCarAsync } from '../../services/garage'
import { GARAGE_VIEW_PAGE_SIZE } from '../../constants/api'
import { calculateTotalPages } from '../../utils/helpers'

const useGarage = () => {
  const dispatch = useAppDispatch()
  const cars = useAppSelector(selectCars)
  const totalCount = useAppSelector(selectTotalCount)
  const carRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const page = Number(searchParams.get('page')) || 1
  const totalPages = calculateTotalPages(totalCount, GARAGE_VIEW_PAGE_SIZE)

  useEffect(() => {
    const getCars = async () => {
      await dispatch(getCarsAsync({ page }))
    }
    if (cars.length === 0 && page === totalPages + 1) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: totalPages.toString(),
      }))
    }

    getCars()
  }, [dispatch, page, totalCount, totalPages, setSearchParams, cars.length])

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: value.toString() }))
    },
    [setSearchParams],
  )

  const handleDelete = useCallback(
    async (id: number) => {
      await dispatch(deleteCarAsync(id))
      try {
        const winner = await dispatch(getWinnerAsync({ id })).unwrap()
        if (winner) {
          await dispatch(deleteWinnerAsync({ id }))
        }
      } catch {
        return
      }
    },
    [dispatch],
  )

  const handleEdit = useCallback(
    (car: Car) => {
      dispatch(setIsUpdating(true))
      setEditingCar(car)
    },
    [dispatch],
  )

  const completeEdit = useCallback(() => {
    dispatch(setIsUpdating(false))
    setEditingCar(null)
  }, [dispatch])

  return {
    cars,
    carRefs,
    totalCount,
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
