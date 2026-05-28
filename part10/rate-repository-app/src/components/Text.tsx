import { Text as NativeText, type TextProps, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorContrast: {
    color: theme.colors.textContrast,
  },
  alignment: {
    textAlign: 'center',
  },
})

type CustomTextProps = TextProps & {
  color?: 'textSecondary' | 'primary' | 'textContrast'
  fontSize?: 'subheading'
  fontWeight?: 'bold'
  alignment?: 'center'
}

export default function Text({ color, fontSize, fontWeight, alignment, style, ...props }: CustomTextProps) {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textContrast' && styles.colorContrast,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    alignment === 'center' && styles.alignment,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}
