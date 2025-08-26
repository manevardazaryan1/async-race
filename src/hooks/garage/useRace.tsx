import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState, AppDispatch } from '../../redux/store/store'
import type { SingleRaceContext, RaceContext } from '../../types/Garage'
import { setIsRacing, setIsSingleRacing, setIsDriving } from '../../redux/slices/garage'
import { getWinnersAsync, createWinnerAsync, updateWinnerAsync } from '../../services/winners'
import { startEngineAsync, stopEngineAsync, driveCarAsync } from '../../services/engine'
import { calculateTime } from '../../utils/helpers'
import { animate, getCurrentCoordinate } from '../../utils/helpers'

const useRace = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { winners } = useSelector((state: RootState) => state.winners)
  const { isRacing, isSingleRacing, isUpdating } = useSelector((state: RootState) => state.garage)
  const [messageForRaceResult, setMessageForRaceResult] = useState<string>('Result of Race')
  const [messageForWinner, setMessageForWinner] = useState<string>('')
  const controllers = useRef<Record<number, AbortController>>({})

  useEffect(() => {
    const getWinners = async () => {
      await dispatch(getWinnersAsync({}))
    }
    getWinners()
  }, [dispatch])

  const handleStartEngine = useCallback(
    async ({ id, carRefs }: SingleRaceContext) => {
      const startResponse = await dispatch(startEngineAsync({ id }))
      const { data } = unwrapResult(startResponse)
      const { velocity, distance } = data
      const time = calculateTime(distance, velocity)
      animate(id, time, 1000, carRefs)
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

  const handleCrush = useCallback(({ id, carRefs }: SingleRaceContext) => {
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
        handleCrush({ id, carRefs })
      }
    },
    [dispatch, handleCrush, handleStartEngine],
  )

  const handleReset = useCallback(
    async ({ cars, carRefs }: RaceContext) => {
      dispatch(setIsRacing(false))
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
            setMessageForWinner(`winner is ${name}`)
          }
          setMessageForRaceResult(`Car ${index} finished!`)
        } else if (driveCarAsync.rejected.match(datum)) {
          setMessageForRaceResult(`${index}`)
          handleCrush({ id, carRefs })
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
  }, [dispatch, handleStartEngine, handleCrush])

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
        setMessageForRaceResult(`winner is ${car?.name}`)
      } else {
        setMessageForRaceResult(`No winner`)
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
