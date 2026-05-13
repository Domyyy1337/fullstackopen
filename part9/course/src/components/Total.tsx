interface TotalProps {
  total: number
}

export default function Total(props: TotalProps) {
  return <p>Number of exercises: {props.total}</p>
}
