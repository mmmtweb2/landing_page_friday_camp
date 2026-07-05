import { BENEFITS } from '../data/campData'

function Benefits() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6 text-center shadow-sm"
            >
              <h3 className="text-lg font-bold text-purple-800">{benefit.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
