import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  text: {
    color: 'grey',
    fontSize: 14,
  },
  blueText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 24,
    fontWeight: '700',
  },
})

type FancyTextProps = {
  isBlue?: boolean
  isBig?: boolean
  children?: React.ReactNode
}

function FancyText({ children, isBlue = false, isBig = false }: FancyTextProps) {
  const textStyles = [styles.text, isBlue && styles.blueText, isBig && styles.bigText]

  return <Text style={textStyles}>{children}</Text>
}

function Main() {
  return (
    <>
      <FancyText>Simple text</FancyText>
      <FancyText isBlue>Blue text</FancyText>
      <FancyText isBig>Big text</FancyText>
      <FancyText isBig isBlue>
        Big blue text
      </FancyText>
    </>
  )
}
