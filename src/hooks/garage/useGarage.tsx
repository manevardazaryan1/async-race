import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import type { RootState, AppDispatch } from '../../redux/store/store'
import type { Car } from '../../types/Garage'
import { setIsUpdating } from '../../redux/slices/garage'
import { deleteWinnerAsync } from '../../services/winners'
import { getCarsAsync, deleteCarAsync } from '../../services/garage'
import { GARAGE_VIEW_PAGE_SIZE } from '../../constants/api'
import { STATUS } from '../../constants/app'
import { calculateTotalPages } from '../../utils/helpers'

const useGarage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cars, totalCount, status } = useSelector((state: RootState) => state.garage)
  const carRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const page = Number(searchParams.get('page')) || 1
  const totalPages = calculateTotalPages(totalCount, GARAGE_VIEW_PAGE_SIZE)
  const prevTotalCount = useRef(totalCount)

  useEffect(() => {
    dispatch(getCarsAsync({ page }))
  }, [dispatch, page])

  useEffect(() => {
    if (prevTotalCount.current !== 0 && totalCount > prevTotalCount.current) {
      setSearchParams({ page: totalPages.toString() }, { replace: true })
    }

    if (prevTotalCount.current !== 0 && totalCount < prevTotalCount.current) {
      dispatch(getCarsAsync({ page }))
    }

    prevTotalCount.current = totalCount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, totalCount, totalPages, setSearchParams])

  useEffect(() => {
    if (page > 1 && cars.length === 0 && status === STATUS.SUCCEEDED) {
      setSearchParams({ page: totalPages.toString() }, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: value.toString() }))
  }

  const handleDelete = useCallback(
    async (id: number) => {
      await dispatch(deleteCarAsync(id))
      await dispatch(deleteWinnerAsync({ id }))
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
    status,
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
