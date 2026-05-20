import { type Statistic } from '../types'

export default function shortenStat(statAmount: Statistic['amount']) {
  if (statAmount < 1000) return String(statAmount)

  const dividedNumber = statAmount / 1000

  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(dividedNumber)}k`
}
