import { useEffect, useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../app/useAppDispatch'
import { useAppSelector } from '../app/useAppSelector'
import type { Car } from '../../types/Garage'
import {
  selectTotalCount as selectWinnersTotalCount,
  selectStatus,
  selectWinners,
} from '../../redux/slices/winners'
import { getCarAsync } from '../../services/garage'
import { getWinnersAsync } from '../../services/winners'
import {
  WINNERS_ORDERING_TYPE,
  WINNERS_SORTING_TYPE,
  WINNERS_VIEW_PAGE_SIZE,
} from '../../constants/api'
import { calculateTotalPages } from '../../utils/helpers'

const useWinners = () => {
  const dispatch = useAppDispatch()
  const winners = useAppSelector(selectWinners)
  const totalCount = useAppSelector(selectWinnersTotalCount)
  const status = useAppSelector(selectStatus)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const [sort, setSort] = useState(searchParams.get('sort') || WINNERS_SORTING_TYPE)
  const [order, setOrder] = useState(searchParams.get('sort') || WINNERS_ORDERING_TYPE)
  const [cars, setCars] = useState<Record<number, Car>>({})
  const totalPages = calculateTotalPages(totalCount, WINNERS_VIEW_PAGE_SIZE)

  useEffect(() => {
    const getCars = async () => {
      const ids = winners.map(({ id }) => id)
      const promises = ids.map((id) => dispatch(getCarAsync({ id })).unwrap())

      const cars = await Promise.all(promises)
      const carMap = cars.reduce((acc, car) => ({ ...acc, [car.id]: car }), {})
      setCars(carMap)
    }

    getCars()
  }, [dispatch, winners])

  useEffect(() => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: page.toString(),
      sort,
      order,
    }))

    dispatch(getWinnersAsync({ page, sort, order }))
  }, [dispatch, setSearchParams, page, sort, order])

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: value.toString() }))
    },
    [setSearchParams],
  )

  return {
    winners,
    cars,
    totalCount,
    totalPages,
    status,
    page,
    sort,
    order,
    setSort,
    setOrder,
    handlePageChange,
  }
}

export default useWinners
