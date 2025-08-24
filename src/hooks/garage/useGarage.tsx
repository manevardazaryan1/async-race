import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import type { RootState, AppDispatch } from '../../redux/store/store'
import type { Car } from '../../types/Garage'
import { getCarsAsync, deleteCarAsync } from '../../services/garage'
import { GARAGE_VIEW_PAGE_SIZE } from '../../constants/api'
import { calculateTotalPages } from '../../utils/helpers'
import useRace from './useRace'

const useGarage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cars, totalCount, status } = useSelector((state: RootState) => state.garage)
  const { handleDrive, handleStop } = useRace()
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [page, setPage] = useState<number>(() => {
    return Number(searchParams.get('page')) || 1
  })

  useEffect(() => {
    setSearchParams({ page: page.toString() })
  }, [page, setSearchParams])

  const totalPages = calculateTotalPages(totalCount, GARAGE_VIEW_PAGE_SIZE)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleDelete = async (id: number) => {
    await dispatch(deleteCarAsync(id))
  }

  const completeEdit = () => {
    setEditingCar(null)
  }

  const handleEdit = (car: Car) => {
    setEditingCar(car)
  }

  useEffect(() => {
    const getCars = async () => {
      await dispatch(getCarsAsync({ page }))

      setSearchParams({ page: page.toString() })

      if (cars.length === 0 && totalPages > 0) {
        setPage(totalPages)
      }
    }

    getCars()
  }, [dispatch, setSearchParams, totalPages, totalCount, page, cars.length])

  return {
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
  }
}

export default useGarage
