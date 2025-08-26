import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store/store'
import type { useCarCreationEditionPanelProps } from '../../types/Garage'
import { createCarAsync, updateCarAsync } from '../../services/garage'
import { generateCarName, generateColor } from '../../utils/helpers'

const useCreationEditionPanel = ({
  editingCar,
  onCompleteEdit,
}: useCarCreationEditionPanelProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const { carsDrivingState } = useSelector((state: RootState) => state.garage)

  useEffect(() => {
    if (editingCar) {
      setName(editingCar.name)
      setColor(editingCar.color)
    } else {
      setName('')
      setColor('#000000')
    }
  }, [editingCar])

  const handleCreate = useCallback(async () => {
    if (!name) return
    await dispatch(createCarAsync({ name, color }))
    setName('')
    setColor('#000000')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, color, name])

  const handleUpdate = useCallback(async () => {
    const id = editingCar?.id
    if (!name || !id) return
    await dispatch(updateCarAsync({ id, name, color }))
    onCompleteEdit?.()
  }, [dispatch, onCompleteEdit, name, color, editingCar?.id])

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [],
  )
  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value),
    [],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (editingCar) {
          handleUpdate()
        } else {
          handleCreate()
        }
      }
    },
    [handleCreate, handleUpdate, editingCar],
  )

  const handleGenerateRandomCars = useCallback(
    async (count: number): Promise<void> => {
      setIsGenerating(true)
      setProgress(0)

      for (let i = 0; i < count; i++) {
        const randomName = generateCarName()
        const randomColor = generateColor()
        const newProgress = ((i + 1) / count) * 100
        setProgress(newProgress)
        await dispatch(createCarAsync({ name: randomName, color: randomColor }))
      }
      setIsGenerating(false)
    },
    [dispatch],
  )

  return {
    name,
    color,
    handleColorChange,
    handleNameChange,
    handleCreate,
    handleUpdate,
    handleKeyDown,
    handleGenerateRandomCars,
    carsDrivingState,
    isGenerating,
    progress,
  }
}

export default useCreationEditionPanel
