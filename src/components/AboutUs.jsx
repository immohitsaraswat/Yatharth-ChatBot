import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Heart, Users, Target, Shield, Clock, Building2, Stethoscope, GraduationCap, ChevronRight } from 'lucide-react'
import './AboutUs.css'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'Yatharth Hospital established in Noida with a vision to deliver world-class healthcare.' },
  { year: '2012', title: 'NABH Accredited', desc: 'Achieved NABH accreditation, a mark of highest quality in Indian healthcare.' },
  { year: '2015', title: 'Greater Noida', desc: 'Expanded with a second super-speciality hospital in Greater Noida.' },
  { year: '2018', title: 'Robotic Surgery', desc: 'Introduced advanced robotic surgery capabilities, a first in the region.' },
  { year: '2020', title: 'COVID Warriors', desc: 'Designated COVID hospital — treated thousands of patients during the pandemic.' },
  { year: '2023', title: 'Noida Extension', desc: 'Opened our third state-of-the-art facility in Noida Extension / Crossing Republik.' },
]

const values = [
  { icon: Heart, title: 'Compassion', desc: 'Every patient is treated with empathy, dignity, and personalised care.' },
  { icon: Shield, title: 'Patient Safety', desc: 'Rigorous protocols and world-class infrastructure ensure zero-compromise safety.' },
  { icon: Target, title: 'Excellence', desc: 'We pursue the highest standards of clinical outcomes and patient satisfaction.' },
  { icon: Users, title: 'Teamwork', desc: 'Our multidisciplinary teams collaborate seamlessly for the best results.' },
]

const stats = [
  { num: '15+', label: 'Years of Excellence' },
  { num: '500+', label: 'Expert Doctors' },
  { num: '1M+', label: 'Patients Treated' },
  { num: '3', label: 'Hospital Locations' },
  { num: '50+', label: 'Specialities' },
  { num: '24/7', label: 'Emergency Care' },
]

const leadership = [
  { name: 'Dr. Ajay Kumar', role: 'Chairman & Managing Director', speciality: 'Cardiac Surgery' },
  { name: 'Dr. Neha Sharma', role: 'Medical Director', speciality: 'Internal Medicine' },
  { name: 'Dr. Rajesh Gupta', role: 'Director – Oncology', speciality: 'Surgical Oncology' },
  { name: 'Dr. Priya Singh', role: 'Director – Neurosciences', speciality: 'Neurosurgery' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function AboutUs() {
  return (
    <section className="about-page">
      {/* Hero Banner */}
      <div className="about-hero">
        <motion.div className="container" initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="about-hero-title">About Yatharth Hospitals</h1>
          <p className="about-hero-sub">A legacy of trust, innovation, and compassionate care since 2008.</p>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="about-stat" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="about-section">
        <div className="container">
          <motion.div className="about-story" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title">Our Story</h2>
            <p className="about-story-text">
              Yatharth Hospital & Trauma Care Services was founded with a singular mission: to make world-class healthcare accessible to everyone in the Delhi-NCR region. Starting as a single facility in Noida's Sector 110, we have grown into a premier super-speciality hospital chain with three modern campuses.
            </p>
            <p className="about-story-text">
              Our journey has been defined by relentless innovation — from introducing robotic surgery in the region to standing as COVID warriors during the pandemic. Today, with over 500 expert doctors across 50+ specialities, we continue to set new benchmarks in patient care, clinical outcomes, and medical technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="about-section about-mv-section">
        <div className="container">
          <div className="about-mv-grid">
            <motion.div className="about-mv-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <div className="mv-icon"><Target size={28} /></div>
              <h3>Our Mission</h3>
              <p>To provide affordable, accessible, and state-of-the-art healthcare with a patient-first approach, ensuring every individual receives the best possible medical treatment regardless of their background.</p>
            </motion.div>
            <motion.div className="about-mv-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
              <div className="mv-icon"><Award size={28} /></div>
              <h3>Our Vision</h3>
              <p>To be recognised as the most trusted healthcare destination in North India, setting global benchmarks in clinical excellence, patient safety, and compassionate care through continuous innovation.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="about-section">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Core Values</motion.h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <motion.div key={v.title} className="about-value-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(10,61,98,0.12)' }}>
                <div className="value-icon"><v.icon size={22} /></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="about-section about-timeline-section">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Our Journey</motion.h2>
          <div className="about-timeline">
            {milestones.map((m, i) => (
              <motion.div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <span className="timeline-year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="about-section">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Leadership Team</motion.h2>
          <div className="about-leaders-grid">
            {leadership.map((l, i) => (
              <motion.div key={l.name} className="leader-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} whileHover={{ y: -4 }}>
                <div className="leader-avatar"><GraduationCap size={28} /></div>
                <h4>{l.name}</h4>
                <span className="leader-role">{l.role}</span>
                <span className="leader-spec"><Stethoscope size={12} /> {l.speciality}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Accreditations */}
      <div className="about-section about-accred-section">
        <div className="container">
          <motion.div className="about-accred" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Building2 size={28} />
            <div>
              <h3>Accreditations & Affiliations</h3>
              <p>NABH Accredited · JCI Candidate · ISO 9001:2015 Certified · Empanelled with 50+ Insurance Companies · International Patient Services Available</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
