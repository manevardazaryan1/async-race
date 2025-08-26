export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]

export const GARAGE_VIEW_NAME = 'GARAGE'
export const WINNERS_VIEW_NAME = 'WINNERS'

export const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'Chevrolet',
  'BMW',
  'Audi',
  'Mercedes',
  'Toyota',
  'Honda',
  'Nissan',
  'Kia',
]

export const CAR_MODELS = [
  'Model S',
  'Mustang',
  'Camaro',
  'X5',
  'A4',
  'C-Class',
  'Corolla',
  'Civic',
  'Altima',
  'Sportage',
]

export const GENERATED_RANDOM_CARS_COUNT = 100
