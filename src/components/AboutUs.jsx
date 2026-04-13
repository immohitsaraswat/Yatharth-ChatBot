import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Heart, Users, Target, Shield, Clock, Building2, Stethoscope, GraduationCap, ChevronRight } from 'lucide-react'
import './AboutUs.css'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'NextGen Hospital established in Noida with a vision to deliver world-class healthcare.' },
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
  { num: '15+', label: 'Years of Excellence', icon: Award },
  { num: '500+', label: 'Expert Doctors', icon: Stethoscope },
  { num: '1M+', label: 'Patients Treated', icon: Heart },
  { num: '3', label: 'Hospital Locations', icon: Building2 },
  { num: '50+', label: 'Specialities', icon: GraduationCap },
  { num: '24/7', label: 'Emergency Care', icon: Clock },
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
        <div className="about-hero-bg">
          <div className="mesh-gradient" />
          <div className="glow-orb orb-1" />
          <div className="glow-orb orb-2" />
        </div>
        
        <motion.div 
          className="container hero-content-wrapper" 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp}
        >
          <motion.div className="about-badge" variants={fadeUp}>
            <span className="badge-line" />
            <span className="badge-text">LEGACY OF CARE</span>
            <span className="badge-line" />
          </motion.div>
          <h1 className="about-hero-title">
            About <span className="gradient-text">NextGen Hospitals</span>
          </h1>
          <p className="about-hero-sub">Defining the future of super-speciality healthcare through innovation, empathy, and excellence since 2008.</p>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <motion.div 
                key={s.label} 
                className="about-stat" 
                initial="hidden" 
                animate="visible" 
                custom={i} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
              >
                <div className="stat-glass-bg" />
                <div className="stat-icon-wrapper">
                  <s.icon size={20} className="stat-icon" />
                </div>
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="about-section about-story-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
          >
            <h2 className="section-title">Our <span className="gradient-text">Story</span></h2>
            <p className="section-subtitle">A legacy built on excellence, trust, and relentless innovation.</p>
          </motion.div>
          
          <div className="about-story-grid">
            <motion.div 
              className="about-story-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="about-story-text">
                NextGen Hospital & Trauma Care Services was founded with a singular mission: to make world-class healthcare accessible to everyone in the Delhi-NCR region. Starting as a single facility in Noida's Sector 110, we have grown into a premier super-speciality hospital chain with three modern campuses.
              </p>
              <p className="about-story-text">
                Our journey has been defined by relentless innovation — from introducing robotic surgery in the region to standing as COVID warriors during the pandemic. Today, with over 500 expert doctors across 50+ specialities, we continue to set new benchmarks in patient care, clinical outcomes, and medical technology.
              </p>
              <motion.div className="about-story-pills" variants={fadeUp}>
                <span className="story-pill"><ChevronRight size={14} /> 15+ Years Excellence</span>
                <span className="story-pill"><ChevronRight size={14} /> 5 Million+ Lives Touched</span>
                <span className="story-pill"><ChevronRight size={14} /> NABH Accredited</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="about-story-visual"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="story-image-container">
                <img src="/assets/images/nextgen-building.png" alt="NextGen Hospital Building" />
                <div className="story-image-overlay" />
                <div className="story-stat-integrated">
                  <div className="integrated-glow" />
                  <Heart className="stat-icon" size={16} />
                  <span className="integrated-text">
                    <span className="bold-num">500+</span> Expert Doctors
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
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
          <motion.div 
            className="section-header"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
          >
            <h2 className="section-title">Core <span className="gradient-text">Values</span></h2>
            <p className="section-subtitle">The foundation of everything we do, every single day.</p>
          </motion.div>
          
          <div className="about-values-grid">
            {values.map((v, i) => (
              <motion.div key={v.title} className="about-value-card" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
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
        <div className="about-timeline-bg" />
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
          >
            <h2 className="section-title">Our <span className="gradient-text">Journey</span></h2>
            <p className="section-subtitle">Significant milestones in our quest for healthcare excellence.</p>
          </motion.div>
          
          <div className="about-timeline">
            <div className="timeline-line-glow" />
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year} 
                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot" />
                  <div className="timeline-dot-glow" />
                </div>
                <motion.div 
                  className="timeline-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <span className="timeline-year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="about-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
          >
            <h2 className="section-title">Leadership <span className="gradient-text">Team</span></h2>
            <p className="section-subtitle">Meet the visionaries driving our clinical excellence.</p>
          </motion.div>
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
