import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { STATUS } from '../../constants/app'
import type { WinnersState, Winners, Winner } from '../../types/Winners'
import {
  getWinnersAsync,
  createWinnerAsync,
  deleteWinnerAsync,
  updateWinnerAsync,
} from '../../services/winners'

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  status: STATUS.IDLE,
  error: null,
}

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWinnersAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(getWinnersAsync.fulfilled, (state, action: PayloadAction<Winners>) => {
        state.status = STATUS.SUCCEEDED
        state.winners = action.payload.winners
        state.totalCount = action.payload.totalCount
      })
      .addCase(getWinnersAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to load winners'
      })
      .addCase(createWinnerAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(createWinnerAsync.fulfilled, (state, action: PayloadAction<Winner>) => {
        state.status = STATUS.SUCCEEDED
        state.winners.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createWinnerAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to create winner'
      })
      .addCase(deleteWinnerAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(deleteWinnerAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = STATUS.SUCCEEDED
        state.winners = state.winners.filter((winner) => winner.id !== action.payload)
        state.totalCount -= 1
      })
      .addCase(deleteWinnerAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to delete winner'
      })
      .addCase(updateWinnerAsync.pending, (state) => {
        state.status = STATUS.LOADING
        state.error = null
      })
      .addCase(updateWinnerAsync.fulfilled, (state, action: PayloadAction<Winner | null>) => {
        state.status = STATUS.SUCCEEDED

        if (!action.payload) return

        const index = state.winners.findIndex((winner) => winner.id === action.payload!.id)

        if (index) {
          state.winners[index] = action.payload
        }
      })
      .addCase(updateWinnerAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message || 'Failed to update winner'
      })
  },
})

export default winnersSlice.reducer
