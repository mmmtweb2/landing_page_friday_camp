import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CAMP_INFO, SESSIONS } from '../data/campData'
import { getOpenSession } from '../utils/sessionStatus'

const GRADES = ['א׳', 'ב׳', 'ג׳', 'ד׳']
const MAX_CHILDREN = 5

function emptyChild() {
  return { firstName: '', grade: '' }
}

function RegistrationForm() {
  const [childCount, setChildCount] = useState(1)
  const [children, setChildren] = useState([emptyChild()])
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending
  const [error, setError] = useState('')
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false)

  const openSession = getOpenSession(SESSIONS)

  function handleChildCountChange(count) {
    setChildCount(count)
    setChildren((prev) => {
      const next = prev.slice(0, count)
      while (next.length < count) next.push(emptyChild())
      return next
    })
  }

  function updateChild(index, field, value) {
    setChildren((prev) => prev.map((child, i) => (i === index ? { ...child, [field]: value } : child)))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const missingChildField = children.some((c) => !c.firstName.trim() || !c.grade)
    if (!lastName.trim() || !phone.trim() || missingChildField) {
      setError('נא למלא שם משפחה, טלפון, ושם פרטי וכיתה לכל ילד/ה')
      return
    }
    setError('')
    setStatus('sending')

    const childrenList = children
      .map((c, i) => `ילד/ה ${i + 1}: ${c.firstName} ${lastName} - כיתה ${c.grade}`)
      .join('\n')

    const templateParams = {
      last_name: lastName,
      children_count: childCount,
      children_list: childrenList,
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

    setStatus('idle')
    setShowPaymentPrompt(true)
  }

  function goToPayment() {
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
            <label className="block text-sm font-bold text-gray-700">כמות ילדים להרשמה</label>
            <select
              value={childCount}
              onChange={(e) => handleChildCountChange(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            >
              {Array.from({ length: MAX_CHILDREN }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {children.map((child, i) => (
            <div key={i} className="grid grid-cols-1 gap-3 rounded-lg border border-purple-100 bg-purple-50/40 p-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700">שם פרטי - ילד/ה {i + 1}</label>
                <input
                  type="text"
                  value={child.firstName}
                  onChange={(e) => updateChild(i, 'firstName', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">כיתה</label>
                <select
                  value={child.grade}
                  onChange={(e) => updateChild(i, 'grade', e.target.value)}
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
            </div>
          ))}

          <div>
            <label className="block text-sm font-bold text-gray-700">שם משפחה</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
            />
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
            {status === 'sending' ? 'שולח...' : 'שליחה'}
          </button>
        </form>
      </div>

      {showPaymentPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-w-sm rounded-2xl bg-white p-6 text-center text-gray-900 shadow-2xl">
            <p className="text-xl font-extrabold text-green-700">✓ הטופס נשלח בהצלחה!</p>
            <p className="mt-3 text-gray-700">
              אתם עוברים כעת לדף התשלום. שימו לב לבחור בדף הסליקה את כמות הילדים שרשמתם ({childCount}).
            </p>
            <button
              type="button"
              onClick={goToPayment}
              className="mt-5 w-full rounded-full bg-yellow-400 py-3 font-extrabold text-purple-900 shadow hover:bg-yellow-300 transition-colors"
            >
              המשך לתשלום
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default RegistrationForm
