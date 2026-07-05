import { CAMP_INFO } from '../data/campData'
import { asset } from '../utils/asset'

function Footer() {
  return (
    <footer className="bg-purple-950 py-8 text-center text-white">
      <div className="mx-auto max-w-lg px-4">
        <img src={asset('logo.webp')} alt={CAMP_INFO.orgName} className="mx-auto h-16 w-auto" />
        <p className="mt-3 font-bold">{CAMP_INFO.locationName}</p>
        <p className="mt-1">
          לפרטים נוספים:{' '}
          <a href={`tel:${CAMP_INFO.phone}`} className="underline hover:text-yellow-300">
            {CAMP_INFO.phoneDisplay}
          </a>
        </p>
        <p className="mt-4 text-sm text-white/60">
          © {new Date().getFullYear()} {CAMP_INFO.orgName}
        </p>
      </div>
    </footer>
  )
}

export default Footer
