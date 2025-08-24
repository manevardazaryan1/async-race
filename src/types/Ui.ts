import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import { BUTTON_SIZES, BUTTON_TYPES } from '../constants/ui'

export type ButtonSize = keyof typeof BUTTON_SIZES
export type ButtonType = keyof typeof BUTTON_TYPES
export type ButtonVariant = keyof (typeof BUTTON_TYPES)[ButtonType]

export interface CustomButtonProps extends ButtonProps {
  customSize?: ButtonSize
  customType?: ButtonType
  customVariant?: ButtonVariant
}

export interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

export interface PaginationPanelProps {
  count: number
  page: number
  handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void
}
