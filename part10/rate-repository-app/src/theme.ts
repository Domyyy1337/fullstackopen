import { Platform } from 'react-native'

const colors = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  primary: '#0366d6',
  barBackground: '#24292e',
  mainBackground: '#e1e4e8',
  cardBackground: 'white',
  textContrast: 'white',
  error: '#d73a4a',
} as const

const theme = {
  colors,
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  measurements: {
    pressableRadius: 5,
  },
  components: {
    formItem: {
      borderColor: colors.textPrimary,
      borderRadius: 5,
      borderWidth: 1,
    },
    formItemError: {
      borderColor: colors.error,
    },
  },
} as const

export default theme
