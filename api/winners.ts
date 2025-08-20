import axios from 'axios'
import { API_ENDPOINTS } from '../constants/api'
import { Winners, Winner } from '../types/Winner'

export const getWinners = async (
  api_base_url: string,
  page: number,
  limit: number,
  sort: string,
  order: string,
): Promise<Winners> => {
  try {
    const response = await axios.get<Winner[]>(`${api_base_url}/${API_ENDPOINTS.WINNERS}`, {
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
  } catch (error) {
    throw error
  }
}

export const getWinner = async (api_base_url: string, id: number): Promise<Winner> => {
  try {
    const response = await axios.get<Winner>(`${api_base_url}/${API_ENDPOINTS.WINNERS}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createWinner = async (api_base_url: string, id: number, wins: number, time: number): Promise<Winner> => {
  try {
    const response = await axios.post<Winner>(`${api_base_url}/${API_ENDPOINTS.WINNERS}`, {
      id,
      wins,
      time,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteWinner = async (api_base_url: string, id: number): Promise<void> => {
  try {
    await axios.delete(`${api_base_url}/${API_ENDPOINTS.WINNERS}/${id}`)
  } catch (error) {
    throw error
  }
}

export const updateWinner = async (api_base_url: string, id: number, wins?: number, time?: number): Promise<Winner> => {
  try {
    const response = await axios.put<Winner>(`${api_base_url}/${API_ENDPOINTS.WINNERS}/${id}`, {
      wins,
      time,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
