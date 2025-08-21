import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  API_BASE_URL,
  API_ENDPOINTS,
  WINNERS_ORDERING_TYPE,
  WINNERS_SORTING_TYPE,
  WINNERS_VIEW_PAGE_SIZE,
} from '../constants/api'
import { getWinners, getWinner, createWinner, deleteWinner, updateWinner } from '../api/winners'

export const getWinnersAsync = createAsyncThunk(
  'winners/getWinners',
  ({
    page,
    limit = WINNERS_VIEW_PAGE_SIZE,
    sort = WINNERS_SORTING_TYPE,
    order = WINNERS_ORDERING_TYPE,
  }: {
    page: number
    limit: number
    sort: string
    order: string
  }) => getWinners(API_BASE_URL, API_ENDPOINTS.WINNERS, page, limit, sort, order),
)

export const getWinnerAsync = createAsyncThunk('winners/getWinner', ({ id }: { id: number }) =>
  getWinner(API_BASE_URL, API_ENDPOINTS.WINNERS, id),
)

export const createWinnerAsync = createAsyncThunk(
  'winners/createWinner',
  ({ id, wins, time }: { id: number; wins: number; time: number }) =>
    createWinner(API_BASE_URL, API_ENDPOINTS.WINNERS, id, wins, time),
)

export const deleteWinnerAsync = createAsyncThunk(
  'winners/deleteWinner',
  async ({ id }: { id: number }) => deleteWinner(API_BASE_URL, API_ENDPOINTS.WINNERS, id),
)

export const updateWinnerAsync = createAsyncThunk(
  'winners/updateWinner',
  ({ id, wins, time }: { id: number; wins?: number; time?: number }) =>
    updateWinner(API_BASE_URL, API_ENDPOINTS.WINNERS, id, wins, time),
)
