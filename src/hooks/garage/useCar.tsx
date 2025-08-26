import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store/store'

const useCar = () => {
  const { isRacing, isUpdating, carsDrivingState, isSingleRacing } = useSelector(
    (state: RootState) => state.garage,
  )
  return {
    isRacing,
    isUpdating,
    isSingleRacing,
    carsDrivingState,
  }
}

export default useCar
