import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Download, ShieldCheck, Lock, AlertCircle } from 'lucide-react'
import './LabReports.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
}

export default function LabReports() {
  const [step, setStep] = useState('search') // search | results | download
  const [patientId, setPatientId] = useState('')
  const [phone, setPhone] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (patientId.trim() && phone.trim()) {
      setStep('results')
    }
  }

  const sampleReports = [
    { id: 'RPT-2024-0891', test: 'Complete Blood Count (CBC)', date: '12 Mar 2024', status: 'Ready' },
    { id: 'RPT-2024-0890', test: 'Lipid Profile', date: '12 Mar 2024', status: 'Ready' },
    { id: 'RPT-2024-0887', test: 'Liver Function Test (LFT)', date: '10 Mar 2024', status: 'Ready' },
    { id: 'RPT-2024-0882', test: 'Thyroid Profile (T3, T4, TSH)', date: '08 Mar 2024', status: 'Ready' },
  ]

  return (
    <section className="lab-page">
      <div className="lab-hero">
        <motion.div className="container" initial="hidden" animate="visible" variants={fadeUp}>
          <Lock size={40} className="lab-hero-icon" />
          <h1>Online Lab Reports</h1>
          <p>Securely access and download your pathology reports anytime, anywhere.</p>
        </motion.div>
      </div>

      <div className="lab-section">
        <div className="container">
          {step === 'search' && (
            <motion.div className="lab-search-card" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="lab-search-header">
                <ShieldCheck size={22} />
                <div>
                  <h3>Secure Report Access</h3>
                  <p>Enter your Patient ID and registered mobile number to access your reports.</p>
                </div>
              </div>
              <form onSubmit={handleSearch} className="lab-form">
                <div className="lab-input-group">
                  <label>Patient ID / UHID</label>
                  <input type="text" placeholder="e.g., YH-2024-12345" value={patientId} onChange={e => setPatientId(e.target.value)} required />
                </div>
                <div className="lab-input-group">
                  <label>Registered Mobile Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <motion.button type="submit" className="btn btn-primary lab-search-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Search size={16} /> Search Reports
                </motion.button>
              </form>
              <p className="lab-note"><AlertCircle size={13} /> For assistance, call <strong>0120-4588000</strong></p>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div className="lab-results-card" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="lab-results-header">
                <div>
                  <h3>Your Reports</h3>
                  <p>Patient ID: <strong>{patientId}</strong></p>
                </div>
                <button className="btn btn-outline lab-back-btn" onClick={() => { setStep('search'); setPatientId(''); setPhone('') }}>
                  ← New Search
                </button>
              </div>
              <div className="lab-reports-list">
                {sampleReports.map((r, i) => (
                  <motion.div key={r.id} className="lab-report-item" initial="hidden" animate="visible" custom={i} variants={fadeUp}>
                    <div className="report-icon"><FileText size={20} /></div>
                    <div className="report-info">
                      <h4>{r.test}</h4>
                      <span className="report-meta">{r.id} · {r.date}</span>
                    </div>
                    <span className="report-status">{r.status}</span>
                    <motion.button className="btn btn-primary report-download-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => alert(`Demo: Downloading ${r.test} report. In production, this would fetch the actual PDF from Firebase Storage.`)}>
                      <Download size={14} /> Download
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              <p className="lab-disclaimer">
                <ShieldCheck size={13} /> Reports are encrypted end-to-end. Only registered patients can access their reports.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="lab-info-section">
        <div className="container">
          <div className="lab-info-grid">
            {[
              { icon: ShieldCheck, title: 'HIPAA & IT-Act Compliant', text: 'All patient data is encrypted and stored securely as per Indian IT Act guidelines.' },
              { icon: FileText, title: 'NABL Accredited Lab', text: 'Reports generated from NABL-accredited laboratories ensuring highest accuracy.' },
              { icon: Lock, title: 'OTP Verified Access', text: 'In production, an OTP will be sent to your registered mobile for identity verification.' },
            ].map((info, i) => (
              <motion.div key={info.title} className="lab-info-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <div className="lab-info-icon"><info.icon size={22} /></div>
                <h4>{info.title}</h4>
                <p>{info.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
