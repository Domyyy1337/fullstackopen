import type { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  courseParts: CoursePart[]
}

export default function Content({ courseParts }: ContentProps) {
  return (
    <div className='partContainer'>
      {courseParts.map(p => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  )
}
