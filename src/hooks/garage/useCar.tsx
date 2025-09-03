import { useAppSelector } from '../app/useAppSelector'
import {
  selectIsRacing,
  selectIsSingleRacing,
  selectDrivingState,
  selectIsUpdating,
} from '../../redux/slices/garage'

const useCar = () => {
  const isRacing = useAppSelector(selectIsRacing)
  const isUpdating = useAppSelector(selectIsUpdating)
  const carsDrivingState = useAppSelector(selectDrivingState)
  const isSingleRacing = useAppSelector(selectIsSingleRacing)
  return {
    isRacing,
    isUpdating,
    isSingleRacing,
    carsDrivingState,
  }
}

export default useCar
