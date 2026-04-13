import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, Clock, ChevronRight, Send, CheckCircle, Building2, Users, Heart, Zap } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './Careers.css'

const perks = [
  { icon: Heart, title: 'Health Benefits', desc: 'Comprehensive medical coverage for you and your family.' },
  { icon: Zap, title: 'Growth Opportunities', desc: 'Continuous learning programs, conferences, and promotions.' },
  { icon: Users, title: 'Collaborative Culture', desc: 'Work alongside 500+ expert doctors in a supportive team.' },
  { icon: Building2, title: 'Modern Facilities', desc: 'State-of-the-art infrastructure across 3 campuses.' },
]

const openings = [
  { id: 1, title: 'Senior Cardiologist', dept: 'Cardiac Sciences', location: 'Noida – Sector 110', type: 'Full-time', urgent: true },
  { id: 2, title: 'Staff Nurse – ICU', dept: 'Nursing', location: 'Greater Noida', type: 'Full-time', urgent: true },
  { id: 3, title: 'Radiologist', dept: 'Radiology', location: 'Noida Extension', type: 'Full-time', urgent: false },
  { id: 4, title: 'Lab Technician', dept: 'Pathology', location: 'Noida – Sector 110', type: 'Full-time', urgent: false },
  { id: 5, title: 'Physiotherapist', dept: 'Rehabilitation', location: 'Greater Noida', type: 'Full-time', urgent: false },
  { id: 6, title: 'Hospital Administrator', dept: 'Administration', location: 'Noida – Sector 110', type: 'Full-time', urgent: false },
  { id: 7, title: 'Junior Resident – Orthopaedics', dept: 'Orthopaedics', location: 'Noida Extension', type: 'Residency', urgent: true },
  { id: 8, title: 'Billing Executive', dept: 'Finance', location: 'Greater Noida', type: 'Full-time', urgent: false },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
}

export default function Careers() {
  const [filter, setFilter] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' })

  const locations = ['All', ...new Set(openings.map(j => j.location))]
  const filtered = filter === 'All' ? openings : openings.filter(j => j.location === filter)

  const handleApply = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'job_applications'), {
        ...form,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        jobLocation: selectedJob.location,
        createdAt: serverTimestamp(),
        status: 'new'
      })
      setApplied(true)
      setTimeout(() => { 
        setApplied(false)
        setSelectedJob(null)
        setForm({ name: '', email: '', phone: '', note: '' }) 
      }, 4000)
    } catch (e) {
      console.error("Error submitting application:", e)
      alert("Failed to submit application. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="careers-page">
      {/* Hero */}
      <div className="careers-hero">
        <motion.div className="container" initial="hidden" animate="visible" variants={fadeUp}>
          <h1>Join Our Team</h1>
          <p>Be part of a healthcare revolution. Shape the future of medicine with NextGen Hospitals.</p>
        </motion.div>
      </div>

      {/* Perks */}
      <div className="careers-section">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Why Work With Us</motion.h2>
          <div className="perks-grid">
            {perks.map((p, i) => (
              <motion.div key={p.title} className="perk-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} whileHover={{ y: -4 }}>
                <div className="perk-icon"><p.icon size={22} /></div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Openings */}
      <div className="careers-section careers-openings-section">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Current Openings</motion.h2>
          <div className="careers-filters">
            {locations.map(loc => (
              <button key={loc} className={`filter-btn ${filter === loc ? 'active' : ''}`} onClick={() => setFilter(loc)}>
                {loc === 'All' ? 'All Locations' : loc}
              </button>
            ))}
          </div>
          <div className="jobs-grid">
            {filtered.map((job, i) => (
              <motion.div key={job.id} className="job-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(10,61,98,0.1)' }} onClick={() => setSelectedJob(job)}>
                <div className="job-header">
                  <h4>{job.title}</h4>
                  {job.urgent && <span className="urgent-badge">Urgent</span>}
                </div>
                <div className="job-meta">
                  <span><Briefcase size={13} /> {job.dept}</span>
                  <span><MapPin size={13} /> {job.location}</span>
                  <span><Clock size={13} /> {job.type}</span>
                </div>
                <button className="job-apply-btn">Apply Now <ChevronRight size={14} /></button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)}>
            <motion.div className="modal-content" initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} onClick={e => e.stopPropagation()}>
              {applied ? (
                <div className="apply-success">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <CheckCircle size={56} />
                  </motion.div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for applying for <strong>{selectedJob.title}</strong>. Our HR team will reach out shortly.</p>
                </div>
              ) : (
                <>
                  <h3>Apply for {selectedJob.title}</h3>
                  <p className="modal-meta">{selectedJob.dept} · {selectedJob.location}</p>
                  <form onSubmit={handleApply} className="apply-form">
                    <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <input type="tel" placeholder="Mobile Number" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    <textarea placeholder="Cover note (optional)" rows={3} value={form.note} onChange={e => setForm({...form, note: e.target.value})} />
                    <motion.button type="submit" className="btn btn-primary" disabled={loading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      {loading ? 'Submitting...' : <><Send size={14} /> Submit Application</>}
                    </motion.button>
                  </form>
                </>
              )}
              <button className="modal-close" onClick={() => setSelectedJob(null)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
