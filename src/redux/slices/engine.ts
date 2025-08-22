import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STATUS } from '../../constants/app'
import type { EngineState, EngineStartResponse } from '../../types/Engine'
import { startEngineAsync, stopEngineAsync, driveCarAsync } from '../../services/engine'

const initialState: EngineState = {
  velocity: {},
  distance: {},
  blocked: {},
  status: STATUS.IDLE,
  error: null,
}

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startEngineAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(
        startEngineAsync.fulfilled,
        (state, action: PayloadAction<{ id: number; data: EngineStartResponse }>) => {
          state.status = STATUS.SUCCEEDED
          const { id, data } = action.payload
          state.velocity[id] = data.velocity
          state.distance[id] = data.distance
        },
      )
      .addCase(startEngineAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to start engine'
      })
      .addCase(stopEngineAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(stopEngineAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = STATUS.SUCCEEDED
        const id = action.payload
        state.velocity[id] = 0
        state.distance[id] = 0
        state.blocked[id] = false
      })
      .addCase(stopEngineAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to stop engine'
      })
      .addCase(driveCarAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(driveCarAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = STATUS.SUCCEEDED
        state.blocked[action.payload] = true
      })
      .addCase(driveCarAsync.rejected, (state, action) => {
        state.status = STATUS.SUCCEEDED
        state.error = action.error.message || 'Failed to drive car'
      })
  },
})

export default engineSlice.reducer
