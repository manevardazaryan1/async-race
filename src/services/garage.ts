import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_ENDPOINTS, GARAGE_VIEW_PAGE_SIZE } from '../constants/api'
import { getCars, getCar, createCar, deleteCar, updateCar } from '../api/garage'

export const getCarsAsync = createAsyncThunk(
  'garage/getCars',
  ({ page, limit = GARAGE_VIEW_PAGE_SIZE }: { page?: number; limit?: number }) =>
    getCars(API_ENDPOINTS.GARAGE, page, limit),
)

export const getCarAsync = createAsyncThunk('garage/getCar', ({ id }: { id: number }) =>
  getCar(API_ENDPOINTS.GARAGE, id),
)

export const createCarAsync = createAsyncThunk(
  'garage/createCar',
  ({ name, color }: { name: string; color: string }) =>
    createCar(API_ENDPOINTS.GARAGE, name, color),
)

export const deleteCarAsync = createAsyncThunk('garage/deleteCar', (id: number) =>
  deleteCar(API_ENDPOINTS.GARAGE, id),
)

export const updateCarAsync = createAsyncThunk(
  'garage/updateCar',
  ({ id, name, color }: { id: number; name?: string; color?: string }) =>
    updateCar(API_ENDPOINTS.GARAGE, id, name, color),
)
