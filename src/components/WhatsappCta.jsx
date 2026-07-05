import { CAMP_INFO } from '../data/campData'

function WhatsappCta() {
  return (
    <section className="bg-green-50 py-10 text-center">
      <div className="mx-auto max-w-lg px-4">
        <h2 className="text-xl font-extrabold text-green-800">
          הזמינו גם את החברים!
        </h2>
        <p className="mt-2 text-gray-700">
          הצטרפו לקבוצת העדכונים שלנו ותהיו הראשונים לדעת מה קורה בכל שבוע
        </p>
        <a
          href={CAMP_INFO.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow hover:bg-green-400 transition-colors"
        >
          הצטרפות לקבוצת הוואטסאפ
        </a>
      </div>
    </section>
  )
}

export default WhatsappCta
