import type { DiaryEntry } from '../types'

interface DiaryProps {
  diary: DiaryEntry
}

export default function Diary({ diary }: DiaryProps) {
  return (
    <div className='diary'>
      <p>Date: {diary.date}</p>
      <p>Weather: {diary.weather}</p>
      <p>Visibility: {diary.visibility}</p>
      {diary.comment && (
        <p>
          Comment: <i>{diary.comment}</i>
        </p>
      )}
    </div>
  )
}
