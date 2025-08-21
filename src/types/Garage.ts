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
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
