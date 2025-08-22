import type { Status } from './App'

export interface Car {
  name: string
  color: string
  id: number
}

export interface Cars {
  cars: Car[]
  totalCount: number
}

export interface GarageState {
  cars: Car[]
  totalCount: number
  status: Status
  creationStatus: Status
  error: string | null
}

export interface CarCreationEditionPanelProps {
  editingCar?: Car | null
  onCompleteEdit?: () => void
  status: string
}

export interface useCarCreationEditionPanelProps {
  editingCar?: Car | null
  onCompleteEdit?: () => void
}
