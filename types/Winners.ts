export interface Winner {
  id: number
  wins: number
  time: number
}

export interface Winners {
  winners: Winner[]
  totalCount: number
}
