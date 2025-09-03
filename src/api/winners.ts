import { api } from './api'
import type { Winners, Winner } from '../types/Winners'

export const getWinners = async (
  endpoint: string,
  page?: number,
  limit?: number,
  sort?: string,
  order?: string,
): Promise<Winners> => {
  const response = await api.get<Winner[]>(`/${endpoint}`, {
    params: {
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    },
  })

  const totalCount = parseInt(response.headers['x-total-count']) || 0
  const winners = response.data
  return { winners, totalCount }
}

export const getWinner = async (endpoint: string, id: number): Promise<Winner> => {
  const response = await api.get<Winner>(`/${endpoint}/${id}`)
  return response.data
}

export const createWinner = async (
  endpoint: string,
  id: number,
  wins: number,
  time: number,
): Promise<Winner> => {
  const response = await api.post<Winner>(`/${endpoint}`, {
    id,
    wins,
    time,
  })
  return response.data
}

export const deleteWinner = async (endpoint: string, id: number): Promise<number> => {
  await api.delete(`/${endpoint}/${id}`)
  return id
}

export const updateWinner = async (
  endpoint: string,
  id: number,
  wins?: number,
  time?: number,
): Promise<Winner | null> => {
  const response = await api.put<Winner>(`/${endpoint}/${id}`, {
    wins,
    time,
  })
  return response.data
}
