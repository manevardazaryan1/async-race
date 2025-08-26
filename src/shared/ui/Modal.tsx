import { memo } from 'react'
import { Modal as MuiModal } from '@mui/material'
import type { ModalProps } from '../../types/Ui'

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!children) {
    return null
  }
  return (
    <MuiModal
      open={isOpen}
      aria-labelledby='progress-modal-title'
      aria-describedby='progress-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      }}
    >
      <div>{children}</div>
    </MuiModal>
  )
}

export default memo(Modal)
