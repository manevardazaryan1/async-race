import type { Status } from './App'
import { WINNERS_SORTING_TYPES, WINNERS_ORDERING_TYPES } from '../constants/api'

export interface Winner {
  id: number
  wins: number
  time: number
}

export interface Winners {
  winners: Winner[]
  totalCount: number
}

export interface WinnersState {
  winners: Winner[]
  totalCount: number
  status: Status
  fetchingStatus: Status
  error: string | null
}

export type WinnerSort = (typeof WINNERS_SORTING_TYPES)[keyof typeof WINNERS_SORTING_TYPES]

export type WinnerOrder = (typeof WINNERS_ORDERING_TYPES)[keyof typeof WINNERS_ORDERING_TYPES]
