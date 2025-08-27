import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STATUS } from '../../constants/app'
import type { GarageState, Cars, Car } from '../../types/Garage'
import { getCarsAsync, createCarAsync, deleteCarAsync, updateCarAsync } from '../../services/garage'

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  isRacing: false,
  isUpdating: false,
  isSingleRacing: false,
  carsDrivingState: {},
  status: STATUS.IDLE,
  fetchingStatus: STATUS.IDLE,
  error: null,
}

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setIsRacing: (state, action: PayloadAction<boolean>) => {
      state.isRacing = action.payload
    },
    setIsDriving: (state, action: PayloadAction<{ id: number; isDriving: boolean }>) => {
      const { id, isDriving } = action.payload
      state.carsDrivingState[id] = isDriving
    },
    setIsSingleRacing: (state, action: PayloadAction<boolean>) => {
      state.isSingleRacing = action.payload
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload
    },
    clearCarsState: (state) => {
      state.cars = []
      state.totalCount = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarsAsync.pending, (state) => {
        state.fetchingStatus = STATUS.LOADING
        state.error = null
      })
      .addCase(getCarsAsync.fulfilled, (state, action: PayloadAction<Cars>) => {
        state.fetchingStatus = STATUS.SUCCEEDED
        state.cars = action.payload.cars
        state.totalCount = action.payload.totalCount
      })
      .addCase(getCarsAsync.rejected, (state, action) => {
        state.fetchingStatus = STATUS.FAILED
        state.error = action.error.message || 'Failed to load cars'
      })
      .addCase(createCarAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(createCarAsync.fulfilled, (state, action: PayloadAction<Car>) => {
        state.status = STATUS.SUCCEEDED
        state.cars.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createCarAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to create car'
      })
      .addCase(deleteCarAsync.pending, (state) => {
        state.status = STATUS.FAILED
        state.error = null
      })
      .addCase(deleteCarAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = STATUS.SUCCEEDED
        state.cars = state.cars.filter((car) => car.id !== action.payload)
        state.totalCount -= 1
      })
      .addCase(deleteCarAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to delete car'
      })
      .addCase(updateCarAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(updateCarAsync.fulfilled, (state, action: PayloadAction<Car | null>) => {
        state.status = STATUS.SUCCEEDED

        if (!action.payload) return

        const index = state.cars.findIndex((car) => car.id === action.payload!.id)

        if (index !== -1) {
          state.cars[index] = action.payload
        }
      })
      .addCase(updateCarAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to update car'
      })
  },
})

export const { setIsRacing, setIsSingleRacing, setIsDriving, setIsUpdating, clearCarsState } =
  garageSlice.actions
export default garageSlice.reducer
