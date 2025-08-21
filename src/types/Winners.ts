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
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
