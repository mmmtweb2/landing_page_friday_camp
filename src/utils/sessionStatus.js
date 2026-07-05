// Registration for each Friday session opens the Sunday before it and
// closes Thursday morning (09:00) before it, per the camp's weekly model.
export function getSessionWindow(session) {
  const friday = new Date(`${session.date}T09:00:00`)

  const opens = new Date(friday)
  opens.setDate(friday.getDate() - 5)
  opens.setHours(0, 0, 0, 0)

  const closes = new Date(friday)
  closes.setDate(friday.getDate() - 1)
  closes.setHours(9, 0, 0, 0)

  const ends = new Date(friday)
  ends.setHours(23, 59, 59, 999)

  return { opens, closes, ends }
}

// 'open' - registration is currently open
// 'upcoming' - registration hasn't opened yet
// 'closed' - registration window passed but the session hasn't happened yet
// 'past' - the session already took place
export function getSessionStatus(session, now = new Date()) {
  const { opens, closes, ends } = getSessionWindow(session)

  if (now > ends) return 'past'
  if (now >= opens && now < closes) return 'open'
  if (now < opens) return 'upcoming'
  return 'closed'
}

export function getOpenSession(sessions, now = new Date()) {
  return sessions.find((session) => getSessionStatus(session, now) === 'open')
}
