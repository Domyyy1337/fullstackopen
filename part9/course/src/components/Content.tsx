import type { CoursePart } from '../types'
import { assertNever } from '../utils'

interface ContentProps {
  courseParts: CoursePart[]
}

export default function Content({ courseParts }: ContentProps) {
  courseParts.forEach(part => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.description, part.exerciseCount)
        break
      case 'group':
        console.log(part.name, part.exerciseCount, part.groupProjectCount)
        break
      case 'background':
        console.log(part.name, part.exerciseCount, part.backgroundMaterial, part.description)
        break
      default:
        return assertNever(part)
    }
  })

  return (
    <div>
      {courseParts.map(c => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  )
}
