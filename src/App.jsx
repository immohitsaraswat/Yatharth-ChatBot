import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specialities from './components/Specialities'
import Doctors from './components/Doctors'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Specialities />
        <Doctors />
        <BookingForm />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
