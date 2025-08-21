import { configureStore } from '@reduxjs/toolkit'
import garageReducer from '../slices/garage'
import winnersReducer from '../slices/winners'
import engineReducer from '../slices/engine'

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    engine: engineReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
