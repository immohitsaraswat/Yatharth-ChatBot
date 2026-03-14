import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specialities from './components/Specialities'
import Doctors from './components/Doctors'
import BookingForm from './components/BookingForm'
import AboutUs from './components/AboutUs'
import Careers from './components/Careers'
import Facilities from './components/Facilities'
import LabReports from './components/LabReports'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'

function HomePage() {
  return (
    <main>
      <Hero />
      <Specialities />
      <Doctors />
      <BookingForm />
    </main>
  )
}

export default function App() {
  // Global haptic feedback for mobile optimization
  useEffect(() => {
    const handleHaptic = (e) => {
      const target = e.target.closest('button, a, .interactive-card, .spec-chip, .time-slot')
      if (target) {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(40) // 40ms light haptic feedback
        }
      }
    }
    
    document.addEventListener('click', handleHaptic, { passive: true })
    return () => document.removeEventListener('click', handleHaptic)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/lab-reports" element={<LabReports />} />
      </Routes>
      <Footer />
      <Chatbot />
    </BrowserRouter>
  )
}
