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
  isRacing: boolean
  isUpdating: boolean
  isSingleRacing: boolean
  carsDrivingState: Record<number, boolean>
  status: Status
  error: string | null
}

export interface CarCreationEditionPanelProps {
  editingCar?: Car | null
  onCompleteEdit?: () => void
}

export interface useCarCreationEditionPanelProps {
  editingCar?: Car | null
  onCompleteEdit?: () => void
}

export interface CarsPanelProps {
  cars: Car[]
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>
  totalCount: number
  status: Status
  handleEdit: (car: Car) => void
  handleDelete: (id: number) => void
  handleDrive: ({ id, carRefs }: SingleRaceContext) => void
  handleStop: ({ id, carRefs }: SingleRaceContext) => void
}

export interface CarPanelProps {
  car: Car
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>
  handleEdit: (car: Car) => void
  handleDelete: (id: number) => void
  handleDrive: ({ id, carRefs }: SingleRaceContext) => void
  handleStop: ({ id, carRefs }: SingleRaceContext) => void
}

export interface RacePanelProps {
  cars: Car[]
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>
}

export interface RaceContext {
  cars: Car[]
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>
}

export interface SingleRaceContext {
  id: number
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>
}
