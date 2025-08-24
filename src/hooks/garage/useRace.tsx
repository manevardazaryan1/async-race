import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { startEngineAsync, stopEngineAsync, driveCarAsync } from '../../services/engine'
import { calculateTime } from '../../utils/helpers'
import type { AppDispatch } from '../../redux/store/store'
import type { SingleRaceContext, RaceContext } from '../../types/Garage'
import { animate } from '../../utils/helpers'

const useRace = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [messageForRaceResult, setMessageForRaceResult] = useState<string>('Result of Race')

  const handleStartEngine = async ({ id, carRefs }: SingleRaceContext) => {
    const startResponse = await dispatch(startEngineAsync({ id }))

    const { data } = unwrapResult(startResponse)
    const { velocity, distance } = data

    const time = calculateTime(distance, velocity)

    animate(id, 'drive', time, 1000, carRefs)
  }

  const handleStop = async ({ id, carRefs }: SingleRaceContext) => {
    animate(id, 'stop', 0, 0, carRefs)
    await dispatch(stopEngineAsync({ id }))
  }

  const handleDrive = async ({ id, carRefs }: SingleRaceContext) => {
    await handleStartEngine({ id, carRefs })

    const d = await dispatch(driveCarAsync({ id }))

    if (driveCarAsync.rejected.match(d)) {
      await handleStop({ id, carRefs })
    }
  }

  const handleGoToStart = async ({ cars, carRefs }: RaceContext) => {
    await Promise.all(cars.map(({ id }) => animate(id, 'drive', 0, 0, carRefs)))
  }

  const handleReset = async ({ cars, carRefs }: RaceContext) => {
    await handleGoToStart({ cars, carRefs })
    await Promise.all(cars.map(({ id }) => handleStop({ id, carRefs })))
  }

  const handleSingleRace = () => {
    let winnerId: number | null = null

    const race = async (
      id: number,
      carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>,
    ) => {
      await handleStartEngine({ id, carRefs })

      const datum = await dispatch(driveCarAsync({ id }))
      const index = datum.payload as number

      if (driveCarAsync.fulfilled.match(datum)) {
        if (!winnerId) {
          winnerId = index
        }
        setMessageForRaceResult(`Car ${index} finished!`)
      } else if (driveCarAsync.rejected.match(datum)) {
        setMessageForRaceResult(`${index}`)
        await handleStop({ id, carRefs })
      }
    }

    return {
      race,
      getWinner: () => winnerId,
    }
  }

  const handleRace = async ({ cars, carRefs }: RaceContext) => {
    const { race, getWinner } = handleSingleRace()
    await Promise.all(cars.map(({ id }) => race(id, carRefs)))
    setMessageForRaceResult(`winner is ${getWinner()}`)
  }

  return {
    messageForRaceResult,
    handleGoToStart,
    setMessageForRaceResult,
    handleDrive,
    handleStop,
    handleRace,
    handleReset,
  }
}

export default useRace
