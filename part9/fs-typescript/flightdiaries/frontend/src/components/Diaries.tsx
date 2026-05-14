import type { DiaryEntry } from '../types'
import Diary from './Diary'

interface DiaryProps {
  diaries: DiaryEntry[]
}

export default function Diaries({ diaries }: DiaryProps) {
  return (
    <div className='diaries'>
      {diaries.map(d => (
        <Diary diary={d} key={d.id} />
      ))}
    </div>
  )
}
