import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Phone, Mail, ChevronRight, CheckCircle, Stethoscope } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './BookingForm.css'

const specialities = [
  'Cardiac Sciences', 'Oncology', 'Neurosciences', 'Orthopaedics',
  'Gastroenterology', 'Nephrology & Urology', 'Ophthalmology', 'Paediatrics', 'Robotic Surgery'
]
const locations = ['Noida Sector 110', 'Greater Noida', 'Noida Extension']

const steps = ['Patient Info', 'Choose Speciality', 'Select Slot', 'Confirm']

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '',
    speciality: '', location: '', date: '', time: '', note: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  const handleNext = (e) => {
    e.preventDefault()
    if (step < steps.length - 1) setStep(s => s + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, 'appointments'), {
        ...form,
        source: 'website_form',
        createdAt: serverTimestamp(),
        status: 'pending'
      })
      setSubmitted(true)
    } catch (e) {
      alert('Error booking appointment. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:30 PM', '4:30 PM', '5:30 PM']

  if (submitted) {
    return (
      <section className="booking-section" id="booking">
        <div className="container">
          <motion.div
            className="booking-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-icon"><CheckCircle size={52} /></div>
            <h2>Appointment Confirmed!</h2>
            <p>
              Thank you, <strong>{form.name}</strong>! Your appointment for <strong>{form.speciality}</strong> at <strong>{form.location}</strong> is booked.
              We will call you on <strong>{form.phone}</strong> to confirm the slot.
            </p>
            <button className="btn btn-primary" id="book-another-btn" onClick={() => { setSubmitted(false); setStep(0); setForm({ name:'',phone:'',speciality:'',location:'',date:'',time:'',note:'' }) }}>
              Book Another
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="booking-section" id="booking">
      <div className="container">
        <div className="booking-wrapper">
          {/* Left Info */}
          <motion.div
            className="booking-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label">Easy Booking</div>
            <h2 className="section-title">Book an <span className="gradient-text">Appointment</span></h2>
            <p className="section-subtitle">Complete your appointment in 4 easy steps. You can also ask our AI assistant to book for you.</p>

            <div className="booking-features">
              {[
                { icon: <Calendar size={20} />, title: 'Flexible Slots', desc: 'Morning, afternoon, evening slots available 7 days a week.' },
                { icon: <Stethoscope size={20} />, title: '200+ Specialists', desc: 'Choose from over 200 expert doctors across 15+ departments.' },
                { icon: <CheckCircle size={20} />, title: 'Instant Confirmation', desc: 'Get call confirmation within 30 minutes of booking.' },
              ].map((f, i) => (
                <div key={i} className="booking-feature">
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="booking-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Stepper */}
            <div className="stepper">
              {steps.map((s, i) => (
                <div key={s} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <div className="step-num">{i < step ? '✓' : i + 1}</div>
                  <div className="step-label">{s}</div>
                  {i < steps.length - 1 && <div className="step-line" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleNext} className="booking-form">
              <AnimatePresence mode="wait">
                {/* Step 0 - Patient Info */}
                {step === 0 && (
                  <motion.div key="step0" className="form-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="form-group">
                      <label><User size={14} /> Full Name</label>
                      <input id="patient-name" required type="text" placeholder="e.g. Mohit Kumar" value={form.name} onChange={e => update('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label><Phone size={14} /> Phone Number</label>
                      <input id="patient-phone" required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                  </motion.div>
                )}

                {/* Step 1 - Speciality */}
                {step === 1 && (
                  <motion.div key="step1" className="form-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="form-group">
                      <label>Select Speciality</label>
                      <div className="speciality-chips">
                        {specialities.map(s => (
                          <button type="button" key={s} className={`spec-chip ${form.speciality === s ? 'selected' : ''}`} id={`chip-${s.replace(/\s/g,'-')}`} onClick={() => update('speciality', s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Hospital Location</label>
                      <select required value={form.location} id="booking-location" onChange={e => update('location', e.target.value)}>
                        <option value="">Select location</option>
                        {locations.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 - Time Slot */}
                {step === 2 && (
                  <motion.div key="step2" className="form-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="form-group">
                      <label><Calendar size={14} /> Preferred Date</label>
                      <input id="booking-date" required type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => update('date', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Select Time Slot</label>
                      <div className="time-slots">
                        {times.map(t => (
                          <button type="button" key={t} className={`time-slot ${form.time === t ? 'selected' : ''}`} id={`time-${t.replace(/\s|:/g,'-')}`} onClick={() => update('time', t)}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Brief Note (Optional)</label>
                      <textarea id="booking-note" placeholder="Describe your symptoms briefly..." rows={3} value={form.note} onChange={e => update('note', e.target.value)} />
                    </div>
                  </motion.div>
                )}

                {/* Step 3 - Confirm */}
                {step === 3 && (
                  <motion.div key="step3" className="form-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="confirm-summary">
                      <h3>Appointment Summary</h3>
                      <div className="confirm-items">
                        {[
                          ['Patient', form.name],
                          ['Phone', form.phone],
                          ['Speciality', form.speciality || '—'],
                          ['Location', form.location || '—'],
                          ['Date', form.date || '—'],
                          ['Time', form.time || '—'],
                        ].map(([label, val]) => (
                          <div key={label} className="confirm-item">
                            <span className="confirm-label">{label}</span>
                            <span className="confirm-val">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-actions">
                {step > 0 && (
                  <button type="button" className="btn btn-outline" id="form-back-btn" onClick={() => setStep(s => s - 1)}>
                    Back
                  </button>
                )}
                <button type="submit" className="btn btn-primary" id="form-next-btn" style={{ flex: 1, justifyContent: 'center' }}>
                  {step === steps.length - 1 ? (loading ? 'Booking...' : 'Confirm Appointment') : 'Continue'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
