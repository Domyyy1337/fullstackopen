import type { CoursePart } from '../types'
import { assertNever } from '../utils'

interface PartProps {
  part: CoursePart
}

export default function Part({ part }: PartProps) {
  switch (part.kind) {
    case 'basic':
      return (
        <div className='part'>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      )
    case 'group':
      return (
        <div className='part'>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div className='part'>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div className='part'>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part)
  }
}
