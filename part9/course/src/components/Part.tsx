import type { CoursePart } from '../types'
import { assertNever } from '../utils'

interface PartProps {
  part: CoursePart
}

export default function Part({ part }: PartProps) {
  return (
    <div className='part'>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>
      {(() => {
        switch (part.kind) {
          case 'basic':
            return (
              <p>
                <i>{part.description}</i>{' '}
              </p>
            )
          case 'group':
            return <p>project exercises {part.groupProjectCount}</p>
          case 'background':
            return (
              <>
                <p>
                  <i>{part.description}</i>
                </p>
                <p>submit to {part.backgroundMaterial}</p>
              </>
            )
          case 'special':
            return (
              <>
                {' '}
                <p>
                  <i>{part.description}</i>
                </p>
                <p>required skills: {part.requirements.join(', ')}</p>
              </>
            )

          default:
            return assertNever(part)
        }
      })()}
    </div>
  )
}
