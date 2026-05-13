import type { CoursePart } from "../types"

interface ContentProps {
  content: CoursePart[]
}

export default function Content(props: ContentProps) {
  return (
    <div>
      {props.content.map((c: CoursePart) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  )
}
