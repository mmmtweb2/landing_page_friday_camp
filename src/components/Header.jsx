import { CAMP_INFO } from '../data/campData'
import { asset } from '../utils/asset'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={asset('logo.webp')} alt={CAMP_INFO.orgName} className="h-14 w-auto" />
          <span className="hidden sm:block font-bold text-purple-700 text-lg">
            {CAMP_INFO.campName}
          </span>
        </div>
        <a
          href="#registration"
          className="rounded-full bg-yellow-400 px-5 py-2 font-bold text-purple-900 shadow hover:bg-yellow-300 transition-colors"
        >
          הרשמה
        </a>
      </div>
    </header>
  )
}

export default Header
