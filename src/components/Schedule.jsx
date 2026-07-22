import { SESSIONS } from '../data/campData'
import { getSessionStatus } from '../utils/sessionStatus'
import { STATUS_LABELS } from '../utils/statusLabels'

function SessionCard({ session, index }) {
  const status = getSessionStatus(session)
  const label = STATUS_LABELS[status]
  const isOpen = status === 'open'

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-shadow ${
        isOpen ? 'border-yellow-400 ring-2 ring-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-purple-700">מפגש {index + 1}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${label.className}`}>
          {label.text}
        </span>
      </div>

      <p className="mt-2 font-bold text-gray-800">{session.dateDisplay}</p>
      <p className="text-xs text-gray-500">{session.hebrewDate}</p>

      {session.published ? (
        <div className="mt-3">
          <p className="font-bold text-purple-800">{session.title}</p>
          <p className="mt-1 text-sm text-gray-600">{session.description}</p>
          {session.highlights && (
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {session.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="mt-3 text-sm italic text-gray-500">
          {status === 'past'
            ? 'המפגש התקיים - תודה לכל המשתתפים!'
            : 'התוכנית תתפרסם ביום ראשון הקרוב, עקבו אחרינו בקבוצה!'}
        </p>
      )}

      {isOpen && (
        <a
          href="#registration"
          className="mt-4 block rounded-full bg-purple-700 py-2 text-center font-bold text-white hover:bg-purple-600 transition-colors"
        >
          נרשמים עכשיו
        </a>
      )}
    </div>
  )
}

function Schedule() {
  return (
    <section className="bg-sky-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-extrabold text-purple-800 sm:text-3xl">
          לוח המפגשים
        </h2>
        <p className="mt-2 text-center text-gray-600">
          ההרשמה נפתחת כל יום ראשון לפעילות הקרובה, ונסגרת ביום חמישי בבוקר
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session, index) => (
            <SessionCard key={session.id} session={session} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Schedule
