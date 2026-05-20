import { StyleSheet, View } from 'react-native'
import { type Statistic } from '../types'
import Text from './Text'
import shortenStat from '../utils/shortenStat'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statistic: {
    flex: 1,
  },
  centeredText: {
    textAlign: 'center',
  },
})

type StatBarProps = {
  statistics: Statistic[]
}

export default function StatBar({ statistics }: StatBarProps) {
  return (
    <View style={styles.container}>
      {statistics.map(s => (
        <View key={s.name}>
          <Text fontWeight='bold' style={styles.centeredText}>
            {shortenStat(s.amount)}
          </Text>
          <Text style={styles.centeredText}>{s.name}</Text>
        </View>
      ))}
    </View>
  )
}
