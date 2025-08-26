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

export const getCurrentCoordinate = (car: HTMLDivElement | null): number | undefined => {
  if (!car) return
  const style = window.getComputedStyle(car)
  const matrix = new DOMMatrixReadOnly(style.transform)
  return matrix.m41
}

export const animate = (
  id: number,
  time: number,
  distance: number = 1000,
  carRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>,
): void | undefined => {
  const car = carRefs.current[id]
  if (!car) return
  car.style.transform = `translate(${distance}px)`
  car.style.transition = `transform ${time}ms linear`
}
