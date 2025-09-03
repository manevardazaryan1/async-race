import { useEffect, useState, useCallback, useRef } from 'react'
import { useAppDispatch } from '../app/useAppDispatch'
import { useAppSelector } from '../app/useAppSelector'
import { unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'
import type { SingleRaceContext, RaceContext } from '../../types/Garage'
import { selectWinners, selectTotalCount } from '../../redux/slices/winners'
import {
  setIsRacing,
  setIsSingleRacing,
  setIsDriving,
  selectIsRacing,
  selectIsSingleRacing,
  selectIsUpdating,
} from '../../redux/slices/garage'
import { getWinnersAsync, createWinnerAsync, updateWinnerAsync } from '../../services/winners'
import { startEngineAsync, stopEngineAsync, driveCarAsync } from '../../services/engine'
import { calculateTime } from '../../utils/helpers'
import { animate, calculateDistance, getCurrentCoordinate } from '../../utils/helpers'

const useRace = () => {
  const dispatch = useAppDispatch()
  const winners = useAppSelector(selectWinners)
  const winnersTotalCount = useAppSelector(selectTotalCount)
  const isRacing = useAppSelector(selectIsRacing)
  const isSingleRacing = useAppSelector(selectIsSingleRacing)
  const isUpdating = useAppSelector(selectIsUpdating)
  const [messageForRaceResult, setMessageForRaceResult] = useState<string>('Result of a race...')
  const [messageForWinner, setMessageForWinner] = useState<string>('')
  const controllers = useRef<Record<number, AbortController>>({})

  useEffect(() => {
    const getWinners = async () => {
      await dispatch(getWinnersAsync({ limit: winnersTotalCount }))
    }
    getWinners()
  }, [dispatch, winnersTotalCount])

  const handleStartEngine = useCallback(
    async ({ id, carRefs }: SingleRaceContext) => {
      const startResponse = await dispatch(startEngineAsync({ id }))
      const { data } = unwrapResult(startResponse)
      const { velocity, distance } = data
      const time = calculateTime(distance, velocity)
      animate(id, time, calculateDistance(carRefs.current[id]), carRefs)
      return time
    },
    [dispatch],
  )

  const handleStop = useCallback(
    async ({ id, carRefs }: SingleRaceContext) => {
      animate(id, 0, 0, carRefs)
      dispatch(setIsDriving({ id, isDriving: false }))
      dispatch(setIsSingleRacing(false))
      controllers.current[id]?.abort()
      delete controllers.current[id]
      await dispatch(stopEngineAsync({ id }))
    },
    [dispatch],
  )

  const handleCrash = useCallback(({ id, carRefs }: SingleRaceContext) => {
    const coordinate = getCurrentCoordinate(carRefs.current[id]) as number
    animate(id, 0, coordinate, carRefs)
  }, [])

  const handleDrive = useCallback(
    async ({ id, carRefs }: SingleRaceContext) => {
      dispatch(setIsDriving({ id, isDriving: true }))
      dispatch(setIsSingleRacing(true))
      controllers.current[id] = new AbortController()
      const controller = controllers.current[id]
      await handleStartEngine({ id, carRefs })
      const datum = await dispatch(driveCarAsync({ id, signal: controller.signal }))

      if (driveCarAsync.rejected.match(datum)) {
        handleCrash({ id, carRefs })
      }
    },
    [dispatch, handleCrash, handleStartEngine],
  )

  const handleReset = useCallback(
    async ({ cars, carRefs }: RaceContext) => {
      dispatch(setIsRacing(false))
      setMessageForRaceResult('')
      await Promise.all(
        cars.map(({ id }) => {
          handleStop({ id, carRefs })
        }),
      )
    },
    [dispatch, handleStop],
  )

  const handleSingleRace = useCallback(() => {
    let winnerId: number | null = null
    let winningTime: number | null = null
    const race = async (
      id: number,
      name: string,
      carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>,
    ) => {
      controllers.current[id] = new AbortController()
      const controller = controllers.current[id]

      try {
        const time = await handleStartEngine({ id, carRefs })
        const datum = await dispatch(driveCarAsync({ id, signal: controller.signal }))
        const index = datum.payload as number

        if (driveCarAsync.fulfilled.match(datum)) {
          if (!winnerId) {
            winnerId = index
            winningTime = time
            setMessageForWinner(`Winner is ${name}`)
          }
          setMessageForRaceResult(`Car ${name} finished!`)
        } else if (driveCarAsync.rejected.match(datum)) {
          setMessageForRaceResult(`${index}`)
          handleCrash({ id, carRefs })
        }
      } catch (err: unknown) {
        if (axios.isCancel(err)) return
        throw err
      }
    }
    return {
      race,
      getWinner: () => ({ id: winnerId, time: winningTime }),
    }
  }, [dispatch, handleStartEngine, handleCrash])

  const handleRace = useCallback(
    async ({ cars, carRefs }: RaceContext) => {
      dispatch(setIsRacing(true))
      const { race, getWinner } = handleSingleRace()
      await Promise.all(cars.map(({ id, name }) => race(id, name, carRefs)))
      const { id, time } = getWinner() as { id: number; time: number }

      if (id) {
        const winner = winners.find((winner) => winner.id === id)
        const car = cars.find((car) => car.id === id)
        if (winner) {
          await dispatch(
            updateWinnerAsync({ id, wins: winner.wins + 1, time: Math.min(winner.time, time) }),
          )
        } else {
          await dispatch(createWinnerAsync({ id, wins: 1, time }))
        }
        setMessageForRaceResult(`Winner is ${car?.name}`)
      } else {
        setMessageForRaceResult(`No winner`)
        setMessageForWinner(`No winner`)
      }
    },
    [dispatch, handleSingleRace, winners],
  )

  return {
    messageForRaceResult,
    messageForWinner,
    isRacing,
    isUpdating,
    isSingleRacing,
    setMessageForRaceResult,
    handleDrive,
    handleStop,
    handleRace,
    handleReset,
  }
}

export default useRace
