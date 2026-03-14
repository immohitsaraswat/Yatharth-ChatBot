import { motion } from 'framer-motion'
import { Ambulance, Droplets, Pill, Microscope, Scan, HeartPulse, Baby, Brain, Bone, Eye, Syringe, Stethoscope, Laptop, Bed, Clock, Shield } from 'lucide-react'
import './Facilities.css'

const facilities = [
  { icon: Ambulance, title: '24/7 Ambulance', desc: 'GPS-tracked fleet with Advanced & Basic Life Support vehicles for rapid emergency response.', color: '#e74c3c' },
  { icon: Droplets, title: 'Blood Bank', desc: '24/7 licensed blood bank with component separation facility and rare blood group inventory.', color: '#c0392b' },
  { icon: Pill, title: '24/7 Pharmacy', desc: 'In-house pharmacy stocked with all essential medications, available round-the-clock.', color: '#27ae60' },
  { icon: Microscope, title: 'Pathology Lab', desc: 'NABL-accredited labs with automated analyzers for accurate and rapid test results.', color: '#2980b9' },
  { icon: Scan, title: 'Advanced Imaging', desc: '3T MRI, 128-slice CT, Digital X-ray, Mammography, PET-CT, and Ultrasound suites.', color: '#8e44ad' },
  { icon: HeartPulse, title: 'Cardiac Cath Lab', desc: 'State-of-the-art catheterisation lab for angiography, angioplasty, and pacemaker implants.', color: '#e67e22' },
  { icon: Brain, title: 'Neuro Navigation', desc: 'Intraoperative neuro navigation systems for precise brain and spine surgeries.', color: '#1abc9c' },
  { icon: Bone, title: 'Robotic Surgery', desc: 'Da Vinci-grade robotic arms for minimally invasive orthopaedic and general surgeries.', color: '#3498db' },
  { icon: Eye, title: 'Ophthalmology Suite', desc: 'Latest LASIK, phaco, and vitreoretinal equipment for comprehensive eye care.', color: '#16a085' },
  { icon: Baby, title: 'NICU & Paediatrics', desc: 'Level III NICU with ventilators, warmers, and 24/7 neonatologist coverage.', color: '#e91e63' },
  { icon: Syringe, title: 'Dialysis Unit', desc: 'Multi-station dialysis centre with RO-treated water and individual patient monitoring.', color: '#f39c12' },
  { icon: Bed, title: 'ICU & Critical Care', desc: 'Multi-specialty ICUs (Cardiac, Neuro, Medical, Surgical) with 1:1 nurse-to-patient ratio.', color: '#0a3d62' },
  { icon: Laptop, title: 'Telemedicine', desc: 'Virtual OPD consultations available via video call for follow-up and second opinions.', color: '#6c5ce7' },
  { icon: Clock, title: 'Modular OTs', desc: 'HEPA-filtered, laminar-flow modular operation theatres for contamination-free surgeries.', color: '#00b894' },
  { icon: Stethoscope, title: 'Health Check Packages', desc: 'Comprehensive preventive health packages tailored for all age groups and risk profiles.', color: '#fdcb6e' },
  { icon: Shield, title: 'Infection Control', desc: 'Dedicated infection control team with HEPA filtration, UV sterilisation, and real-time audits.', color: '#636e72' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45 } }),
}

export default function Facilities() {
  return (
    <section className="facilities-page">
      <div className="facilities-hero">
        <motion.div className="container" initial="hidden" animate="visible" variants={fadeUp}>
          <h1>World-Class Facilities</h1>
          <p>Cutting-edge medical infrastructure designed for precision, safety, and patient comfort.</p>
        </motion.div>
      </div>

      <div className="facilities-section">
        <div className="container">
          <div className="facilities-grid">
            {facilities.map((f, i) => (
              <motion.div key={f.title} className="facility-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(10,61,98,0.1)' }}>
                <div className="facility-icon" style={{ background: `${f.color}12`, color: f.color }}>
                  <f.icon size={24} />
                </div>
                <div className="facility-info">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="facilities-cta-section">
        <div className="container">
          <motion.div className="facilities-cta" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2>Need a Facility Not Listed?</h2>
            <p>Contact us and our team will guide you to the right department.</p>
            <a href="/#contact" className="btn btn-primary">Contact Us</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
