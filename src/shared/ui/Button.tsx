import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BUTTON_SIZES, BUTTON_TYPES } from '../../constants/ui'

import type { CustomButtonProps } from '../../types/Ui'

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    !['customSize', 'customType', 'customVariant'].includes(prop as string),
})<CustomButtonProps>(
  ({ customSize = 'medium', customType = 'primary', customVariant = 'contained' }) => ({
    ...BUTTON_SIZES[customSize],
    ...BUTTON_TYPES[customType][customVariant],
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
  }),
)

export const Button = (props: CustomButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}
