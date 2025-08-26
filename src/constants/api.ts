export const API_BASE_URL = 'http://127.0.0.1:3000'

export const API_ENDPOINTS = {
  GARAGE: 'garage',
  ENGINE: 'engine',
  WINNERS: 'winners',
}

export const ENGINE_STATUS_TYPES = {
  STARTED: 'started',
  STOPPED: 'stopped',
  DRIVE: 'drive',
}

export const GARAGE_VIEW_PAGE_SIZE = 7

export const WINNERS_VIEW_PAGE_SIZE = 10

export const WINNERS_SORTING_TYPES = {
  ID: 'id',
  WINS: 'wins',
  TIME: 'time',
} as const

export const WINNERS_ORDERING_TYPES = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export const WINNERS_SORTING_TYPE = WINNERS_SORTING_TYPES.TIME

export const WINNERS_ORDERING_TYPE = WINNERS_ORDERING_TYPES.ASC
