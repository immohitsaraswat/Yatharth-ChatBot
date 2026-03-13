import { motion } from 'framer-motion'
import { Search, Calendar, ChevronRight, Heart, Shield, Clock, Award } from 'lucide-react'
import './Hero.css'

const stats = [
  { icon: <Heart size={20} />, value: '50,000+', label: 'Happy Patients' },
  { icon: <Shield size={20} />, value: '200+', label: 'Expert Doctors' },
  { icon: <Clock size={20} />, value: '24/7', label: 'Emergency Care' },
  { icon: <Award size={20} />, value: '15+', label: 'Specialities' },
]

export default function Hero() {
  const handleSearch = (e) => {
    e.preventDefault()
    const val = e.target.search.value?.toLowerCase()
    if (val) {
      document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="home">
      {/* BG overlay gradient */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-pattern" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dot" />
            Super Speciality Hospital Chain • Delhi NCR
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            World-Class Care,
            <br />
            <span className="hero-title-accent">Close to Home</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Advanced medical expertise combined with compassionate care. 
            Experience healthcare reimagined across Noida, Greater Noida & beyond.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            className="hero-search"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="search-inner">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                name="search"
                id="hero-search-input"
                placeholder="Search doctors, specialities or symptoms..."
                className="search-input"
              />
              <button type="submit" className="search-btn" id="hero-search-btn">
                Search
              </button>
            </div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#booking" className="btn btn-primary hero-btn" id="hero-book-btn">
              <Calendar size={18} />
              Book Appointment
            </a>
            <a href="#doctors" className="btn btn-secondary hero-btn" id="hero-doctors-btn">
              Find Doctors
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Hero Visual - Floating Card */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="hero-card glass-card">
            <div className="hero-card-header">
              <div className="card-avatar">
                <Heart size={22} />
              </div>
              <div>
                <div className="card-name">Dr. Priya Sharma</div>
                <div className="card-spec">Cardiologist · Noida</div>
              </div>
              <div className="card-badge online">Available</div>
            </div>
            <div className="hero-card-slots">
              <div className="slot-label">Next available slots</div>
              <div className="slots-grid">
                <button className="slot active" id="slot-1">10:30 AM</button>
                <button className="slot" id="slot-2">12:00 PM</button>
                <button className="slot" id="slot-3">3:30 PM</button>
                <button className="slot" id="slot-4">5:00 PM</button>
              </div>
              <a href="#booking" className="btn btn-primary w-full" style={{justifyContent:'center', marginTop:'0.75rem'}} id="card-book-btn">
                Confirm Booking
              </a>
            </div>
          </div>

          {/* Floating mini cards */}
          <motion.div
            className="float-card float-card-1"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Shield size={16} />
            <span>NABH Accredited</span>
          </motion.div>
          <motion.div
            className="float-card float-card-2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Award size={16} />
            <span>15+ Years of Excellence</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
