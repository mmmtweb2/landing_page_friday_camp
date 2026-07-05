import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Schedule from './components/Schedule'
import RegistrationForm from './components/RegistrationForm'
import WhatsappCta from './components/WhatsappCta'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Benefits />
      <Schedule />
      <RegistrationForm />
      <WhatsappCta />
      <Footer />
    </div>
  )
}

export default App
