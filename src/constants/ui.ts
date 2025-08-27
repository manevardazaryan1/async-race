export const BUTTON_SIZES = {
  small: {
    padding: '4px 16px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '8px 32px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 48px',
    fontSize: '1.25rem',
  },
} as const

export const BUTTON_TYPES = {
  primary: {
    contained: {
      backgroundColor: '#555555',
      color: '#fff',
      border: 'none',
      '&:hover': {
        backgroundColor: '#555555',
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#555555',
      border: '2px solid #555555',
      '&:hover': {
        backgroundColor: 'rgba(63, 81, 181, 0.04)',
      },
    },
  },
  secondary: {
    contained: {
      backgroundColor: '#f50057',
      color: '#fff',
      border: 'none',
      '&:hover': {
        backgroundColor: '#c51162',
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#f50057',
      border: '2px solid #f50057',
      '&:hover': {
        backgroundColor: 'rgba(245, 0, 87, 0.04)',
      },
    },
  },
} as const

export const INPUT_SIZES = {
  small: {
    padding: '4px 8px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '8px 12px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 16px',
    fontSize: '1.25rem',
  },
} as const

export const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

export const TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

export const VARIANT = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
}
