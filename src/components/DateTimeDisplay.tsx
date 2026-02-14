import { useState, useEffect } from 'react'

function formatDisplay(date: Date) {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  const offset = -date.getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  const hrs = Math.floor(Math.abs(offset) / 60)
  const mins = Math.abs(offset) % 60
  const gmt = `GMT${sign}${hrs}:${mins.toString().padStart(2, '0')}`
  return { time: `${h}:${m}:${s}`, suffix: `(${gmt}) Indore, India` }
}

export default function DateTimeDisplay() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { time, suffix } = formatDisplay(now)
  return (
    <div className="datetime-display" aria-live="polite">
      {time}
      <span className="datetime-suffix">{suffix}</span>
    </div>
  )
}
