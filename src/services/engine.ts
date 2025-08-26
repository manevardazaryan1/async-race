import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL, API_ENDPOINTS, ENGINE_STATUS_TYPES } from '../constants/api'
import { stopEngine, startEngine, driveCar } from '../api/engine'

export const startEngineAsync = createAsyncThunk('engine/startEngine', ({ id }: { id: number }) =>
  startEngine(API_BASE_URL, API_ENDPOINTS.ENGINE, ENGINE_STATUS_TYPES.STARTED, id),
)

export const stopEngineAsync = createAsyncThunk('engine/stopEngine', ({ id }: { id: number }) =>
  stopEngine(API_BASE_URL, API_ENDPOINTS.ENGINE, ENGINE_STATUS_TYPES.STOPPED, id),
)

export const driveCarAsync = createAsyncThunk(
  'engine/driveCar',
  async ({ id, signal }: { id: number; signal?: AbortSignal }, { rejectWithValue }) => {
    try {
      await driveCar(API_BASE_URL, API_ENDPOINTS.ENGINE, ENGINE_STATUS_TYPES.DRIVE, id, signal)
      return id
    } catch {
      return rejectWithValue(`Car ${id} crashed`)
    }
  },
)
