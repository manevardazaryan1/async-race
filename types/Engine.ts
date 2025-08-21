export interface EngineStartResponse {
  velocity: number
  distance: number
}

export interface DriveResponse {
  success: boolean
}

export interface EngineState {
  velocity: Record<number, number>
  distance: Record<number, number>
  blocked: Record<number, boolean>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
