import { CAMP_INFO } from '../data/campData'
import { asset } from '../utils/asset'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-fuchsia-700/90 px-6 py-5 text-center shadow-xl md:mx-16">
          <h1 className="text-3xl font-extrabold text-yellow-300 sm:text-5xl">
            {CAMP_INFO.campName}
          </h1>
          <p className="mt-1 text-lg font-medium text-white sm:text-xl">
            {CAMP_INFO.tagline}
          </p>
        </div>

        <p className="mt-2 text-center text-sm text-white/90">
          מבית {CAMP_INFO.orgName}
        </p>

        <div className="mt-6 flex justify-center">
          <img
            src={asset('car.webp')}
            alt="מכונית המרוץ של הטובים על גלגלים"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 text-center">
          <p className="text-xl font-bold text-purple-900">{CAMP_INFO.ctaSlogan}</p>
          <a
            href="#registration"
            className="rounded-full bg-yellow-400 px-8 py-3 text-lg font-extrabold text-purple-900 shadow-lg hover:bg-yellow-300 transition-colors"
          >
            להרשמה למפגש הקרוב
          </a>
          <p className="text-sm text-purple-900/80">
            {CAMP_INFO.time} · {CAMP_INFO.locationName} · {CAMP_INFO.audience} · {CAMP_INFO.priceLabel}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
