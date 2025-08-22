import axios from 'axios'
import type { Winners, Winner } from '../types/Winners'

export const getWinners = async (
  api_base_url: string,
  endpoint: string,
  page: number,
  limit: number,
  sort: string,
  order: string,
): Promise<Winners> => {
  const response = await axios.get<Winner[]>(`${api_base_url}/${endpoint}`, {
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

export const getWinner = async (
  api_base_url: string,
  endpoint: string,
  id: number,
): Promise<Winner> => {
  const response = await axios.get<Winner>(`${api_base_url}/${endpoint}/${id}`)
  return response.data
}

export const createWinner = async (
  api_base_url: string,
  endpoint: string,
  id: number,
  wins: number,
  time: number,
): Promise<Winner> => {
  const response = await axios.post<Winner>(`${api_base_url}/${endpoint}`, {
    id,
    wins,
    time,
  })
  return response.data
}

export const deleteWinner = async (
  api_base_url: string,
  endpoint: string,
  id: number,
): Promise<number> => {
  await axios.delete(`${api_base_url}/${endpoint}/${id}`)
  return id
}

export const updateWinner = async (
  api_base_url: string,
  endpoint: string,
  id: number,
  wins?: number,
  time?: number,
): Promise<Winner | null> => {
  const response = await axios.put<Winner>(`${api_base_url}/${endpoint}/${id}`, {
    wins,
    time,
  })
  return response.data
}
