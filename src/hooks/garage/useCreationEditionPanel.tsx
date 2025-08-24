import { useState, useEffect } from 'react'
import type { AppDispatch } from '../../redux/store/store'
import { useDispatch } from 'react-redux'
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

  useEffect(() => {
    if (editingCar) {
      setName(editingCar.name)
      setColor(editingCar.color)
    } else {
      setName('')
      setColor('#000000')
    }
  }, [editingCar])

  const handleCreate = async () => {
    if (!name) return
    await dispatch(createCarAsync({ name, color }))
    setName('')
    setColor('#000000')
  }

  const handleUpdate = async () => {
    const id = editingCar?.id
    if (!name || !id) return
    await dispatch(updateCarAsync({ id, name, color }))
    onCompleteEdit?.()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (editingCar) {
        handleUpdate()
      } else {
        handleCreate()
      }
    }
  }

  const handleGenerateRandomCars = async (count: number): Promise<void> => {
    setIsGenerating(true)
    setProgress(0)

    for (let i = 0; i < count; i++) {
      const randomName = generateCarName()
      const randomColor = generateColor()

      await dispatch(createCarAsync({ name: randomName, color: randomColor }))

      const newProgress = ((i + 1) / count) * 100
      setProgress(newProgress)
    }

    setIsGenerating(false)
  }

  return {
    name,
    color,
    handleColorChange,
    handleNameChange,
    handleCreate,
    handleUpdate,
    handleKeyDown,
    handleGenerateRandomCars,
    isGenerating,
    progress,
  }
}

export default useCreationEditionPanel
