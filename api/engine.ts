import axios from 'axios'
import { API_ENDPOINTS } from '../constants/api'
import { EngineStartResponse, DriveResponse } from '../types/Engine'

export const startEngine = async (
  api_base_url: string,
  id: number,
  status: string,
): Promise<EngineStartResponse | null> => {
  try {
    const response = await axios.patch<EngineStartResponse>(`${api_base_url}/${API_ENDPOINTS.ENGINE}`, {
      params: {
        id,
        status: `${status}`,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const stopEngine = async (api_base_url: string, id: number, status: string): Promise<void> => {
  try {
    await axios.patch(`${api_base_url}/${API_ENDPOINTS.ENGINE}`, {
      params: {
        id,
        status: `${status}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export const driveCar = async (api_base_url: string, id: number, status: string): Promise<boolean> => {
  try {
    const response = await axios.patch<DriveResponse>(`${api_base_url}/${API_ENDPOINTS.ENGINE}`, {
      params: {
        id,
        status: `${status}`,
      },
    })

    return response.data.success
  } catch (error) {
    throw error
  }
}
