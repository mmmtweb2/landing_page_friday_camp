import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CAMP_INFO, SESSIONS } from '../data/campData'
import { getOpenSession } from '../utils/sessionStatus'

const GRADES = ['א׳', 'ב׳', 'ג׳', 'ד׳']

function RegistrationForm() {
  const [childName, setChildName] = useState('')
  const [grade, setGrade] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  const openSession = getOpenSession(SESSIONS)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!childName.trim() || !grade || !phone.trim()) {
      setError('נא למלא שם ילד/ה, כיתה וטלפון')
      return
    }
    setError('')
    setStatus('sending')

    const templateParams = {
      child_name: childName,
      grade,
      phone,
      notes: notes || '-',
      session_date: `${openSession.dateDisplay} (${openSession.hebrewDate})`,
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
    } catch (err) {
      console.error('EmailJS send failed:', err)
    }

    window.location.href = CAMP_INFO.paymentLink
  }

  if (!openSession) {
    return (
      <section id="registration" className="bg-purple-800 py-14 text-center text-white">
        <div className="mx-auto max-w-lg px-4">
          <h2 className="text-2xl font-extrabold">ההרשמה סגורה כרגע</h2>
          <p className="mt-3 text-white/90">
            ההרשמה למפגש הבא תיפתח ביום ראשון הקרוב. הישארו מעודכנים בקבוצת הוואטסאפ שלנו!
          </p>
          <a
            href={CAMP_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-full bg-green-500 px-6 py-3 font-bold hover:bg-green-400 transition-colors"
          >
            הצטרפות לקבוצת העדכונים
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="registration" className="bg-purple-800 py-14 text-white">
      <div className="mx-auto max-w-lg px-4">
        <h2 className="text-center text-2xl font-extrabold">הרשמה למפגש הקרוב</h2>
        <p className="mt-2 text-center text-white/90">
          {openSession.dateDisplay} · {openSession.hebrewDate} · {CAMP_INFO.priceLabel}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 text-right text-gray-900 shadow-xl">
          <div>
            <label className="block text-sm font-bold text-gray-700">שם הילד/ה</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">כיתה</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            >
              <option value="">בחרו כיתה</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">טלפון הורה</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">הערות (לא חובה)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm font-bold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-full bg-yellow-400 py-3 font-extrabold text-purple-900 shadow hover:bg-yellow-300 transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'שולח...' : 'המשך לתשלום'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default RegistrationForm
