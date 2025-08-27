import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getCarsAsync } from '../../services/garage'
import type { RootState, AppDispatch } from '../../redux/store/store'
import { getWinnersAsync } from '../../services/winners'
import {
  WINNERS_ORDERING_TYPE,
  WINNERS_SORTING_TYPE,
  WINNERS_VIEW_PAGE_SIZE,
} from '../../constants/api'
import { calculateTotalPages } from '../../utils/helpers'

const useWinners = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { winners, totalCount, status, fetchingStatus } = useSelector(
    (state: RootState) => state.winners,
  )
  const { cars, totalCount: carsTotalCount } = useSelector((state: RootState) => state.garage)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const [sort, setSort] = useState(searchParams.get('sort') || WINNERS_SORTING_TYPE)
  const [order, setOrder] = useState(searchParams.get('sort') || WINNERS_ORDERING_TYPE)
  const totalPages = calculateTotalPages(totalCount, WINNERS_VIEW_PAGE_SIZE)

  const data = winners.map(({ id, wins, time }) => ({
    id,
    wins,
    time,
    car: cars.find((car) => car.id === id),
  }))

  useEffect(() => {
    dispatch(getCarsAsync({ limit: carsTotalCount }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    const getWinners = async () => {
      await dispatch(getWinnersAsync({ page, sort, order }))
    }
    getWinners()
  }, [dispatch, searchParams, page, sort, order])

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: value.toString() }))
    },
    [setSearchParams],
  )

  useEffect(() => {
    setSearchParams({ page: String(page), sort, order }, { replace: true })
  }, [setSearchParams, page, order, sort])

  return {
    data,
    totalCount,
    totalPages,
    status,
    fetchingStatus,
    page,
    sort,
    order,
    setSort,
    setOrder,
    handlePageChange,
  }
}

export default useWinners
