import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STATUS } from '../../constants/app'
import type { GarageState, Cars, Car } from '../../types/Garage'
import { getCarsAsync, createCarAsync, deleteCarAsync, updateCarAsync } from '../../services/garage'

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  status: STATUS.IDLE,
  creationStatus: STATUS.IDLE,
  error: null,
}

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarsAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(getCarsAsync.fulfilled, (state, action: PayloadAction<Cars>) => {
        state.status = STATUS.SUCCEEDED
        state.cars = action.payload.cars
        state.totalCount = action.payload.totalCount
      })
      .addCase(getCarsAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to load cars'
      })
      .addCase(createCarAsync.pending, (state) => {
        state.creationStatus = STATUS.LOADING
        state.error = null
      })
      .addCase(createCarAsync.fulfilled, (state, action: PayloadAction<Car>) => {
        state.creationStatus = STATUS.SUCCEEDED
        state.cars.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createCarAsync.rejected, (state, action) => {
        state.creationStatus = STATUS.FAILED
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

export default garageSlice.reducer
