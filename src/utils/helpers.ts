import { CAR_BRANDS, CAR_MODELS } from '../constants/app'

export const calculateTime = (distance: number, velocity: number): number =>
  Math.round(distance / velocity)

export const calculateTotalPages = (totalCount: number, limit: number): number =>
  Math.ceil(totalCount / limit)

export const generateColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

export const generateCarName = (
  carBrands: string[] = CAR_BRANDS,
  carModels: string[] = CAR_MODELS,
) => {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)]
  const model = carModels[Math.floor(Math.random() * carModels.length)]
  return `${brand} ${model}`
}

export const animate = (
  id: number,
  status: string,
  time: number,
  distance: number = 1000,
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>,
) => {
  const car = carRefs.current[id]
  if (!car) return 0
  const style = window.getComputedStyle(car)
  const matrix = new DOMMatrixReadOnly(style.transform)

  const dis = status === 'stop' ? matrix.m41 : distance
  if (car) {
    car.style.transform = `translate(${dis}px)`
    car.style.transition = `transform ${time}ms linear`
  }
}

export const sortObjectByValue = (obj: { [key: string]: number }) => {
  const entries = Object.entries(obj)

  entries.sort((a, b) => a[1] - b[1])

  return Object.fromEntries(entries)
}
