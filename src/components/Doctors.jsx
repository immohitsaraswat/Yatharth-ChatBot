import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Calendar, Filter } from 'lucide-react'
import './Doctors.css'

const doctors = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    designation: 'Director & HOD',
    speciality: 'Cardiac Sciences',
    qual: 'MBBS, MD, DM (Cardiology)',
    location: 'Noida',
    experience: '22 Years',
    rating: 4.9,
    reviews: 1240,
    available: true,
    color: '#e74c3c',
    initial: 'RS',
  },
  {
    id: 2,
    name: 'Dr. Priya Mehta',
    designation: 'Senior Consultant',
    speciality: 'Oncology',
    qual: 'MBBS, MD, DNB (Medical Oncology)',
    location: 'Greater Noida',
    experience: '18 Years',
    rating: 4.8,
    reviews: 876,
    available: true,
    color: '#8e44ad',
    initial: 'PM',
  },
  {
    id: 3,
    name: 'Dr. Amit Verma',
    designation: 'HOD & Lead Surgeon',
    speciality: 'Neurosciences',
    qual: 'MBBS, MS, MCh (Neurosurgery)',
    location: 'Noida',
    experience: '20 Years',
    rating: 4.9,
    reviews: 1540,
    available: false,
    color: '#2980b9',
    initial: 'AV',
  },
  {
    id: 4,
    name: 'Dr. Sujata Gupta',
    designation: 'Senior Consultant',
    speciality: 'Orthopaedics',
    qual: 'MBBS, MS (Orthopaedics)',
    location: 'Noida Extension',
    experience: '15 Years',
    rating: 4.7,
    reviews: 650,
    available: true,
    color: '#27ae60',
    initial: 'SG',
  },
  {
    id: 5,
    name: 'Dr. Vikram Singh',
    designation: 'Chief Gastroenterologist',
    speciality: 'Gastroenterology',
    qual: 'MBBS, MD, DM (Gastroenterology)',
    location: 'Noida',
    experience: '17 Years',
    rating: 4.8,
    reviews: 930,
    available: true,
    color: '#e67e22',
    initial: 'VS',
  },
  {
    id: 6,
    name: 'Dr. Kavita Rao',
    designation: 'Consultant Nephrologist',
    speciality: 'Nephrology',
    qual: 'MBBS, MD, DM (Nephrology)',
    location: 'Greater Noida',
    experience: '12 Years',
    rating: 4.6,
    reviews: 420,
    available: true,
    color: '#16a085',
    initial: 'KR',
  },
]

const locations = ['All Locations', 'Noida', 'Greater Noida', 'Noida Extension']
const specs = ['All Specialities', 'Cardiac Sciences', 'Oncology', 'Neurosciences', 'Orthopaedics', 'Gastroenterology', 'Nephrology']

export default function Doctors() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All Locations')
  const [spec, setSpec] = useState('All Specialities')

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase())
    const matchLocation = location === 'All Locations' || d.location === location
    const matchSpec = spec === 'All Specialities' || d.speciality === spec
    return matchSearch && matchLocation && matchSpec
  })

  return (
    <section className="doctors-section" id="doctors">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">Our Team</div>
          <h2 className="section-title">Meet Our <span className="gradient-text">Expert Doctors</span></h2>
          <p className="section-subtitle">
            200+ nationally renowned specialists delivering evidence-based care with empathy and precision.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="doctors-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="filter-search">
            <Search size={16} className="filter-search-icon" />
            <input
              type="text"
              id="doctor-search-input"
              placeholder="Search by name or speciality..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-selects">
            <div className="filter-select-wrap">
              <MapPin size={14} />
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="filter-select"
                id="location-filter"
              >
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="filter-select-wrap">
              <Filter size={14} />
              <select
                value={spec}
                onChange={e => setSpec(e.target.value)}
                className="filter-select"
                id="spec-filter"
              >
                {specs.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Doctor Cards */}
        <div className="doctors-grid">
          {filtered.length === 0 && (
            <div className="no-results">
              <p>No doctors found. Try adjusting filters.</p>
            </div>
          )}
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              className="doctor-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="doctor-card-top">
                <div className="doctor-avatar" style={{ background: `linear-gradient(135deg, ${doc.color}, ${doc.color}aa)` }}>
                  {doc.initial}
                  {doc.available && <span className="available-dot" />}
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <div className="doctor-designation">{doc.designation}</div>
                  <div className="doctor-speciality" style={{ color: doc.color }}>
                    {doc.speciality}
                  </div>
                </div>
              </div>

              <div className="doctor-meta">
                <div className="meta-item">
                  <span className="meta-label">Qualification</span>
                  <span className="meta-value">{doc.qual}</span>
                </div>
                <div className="meta-row">
                  <div className="meta-item">
                    <span className="meta-label">Experience</span>
                    <span className="meta-value">{doc.experience}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Location</span>
                    <span className="meta-value">{doc.location}</span>
                  </div>
                </div>
              </div>

              <div className="doctor-rating">
                <div className="rating-stars">
                  <Star size={13} fill="currentColor" />
                  <span className="rating-val">{doc.rating}</span>
                </div>
                <span className="rating-count">({doc.reviews} reviews)</span>
                <span className={`avail-badge ${doc.available ? 'avail' : 'unavail'}`}>
                  {doc.available ? 'Available Today' : 'Next Available'}
                </span>
              </div>

              <div className="doctor-actions">
                <button className="btn btn-outline doc-btn" id={`view-profile-${doc.id}`} onClick={() => alert(`Full profile for ${doc.name} will be available soon.`)}>
                  View Profile
                </button>
                <a href="#booking" className="btn btn-primary doc-btn" id={`book-doc-${doc.id}`}>
                  <Calendar size={14} />
                  Book
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '2.5rem' }}
        >
          <button className="btn btn-outline" id="view-all-doctors-btn" onClick={() => alert('Complete doctor directory is coming soon!')}>View All 200+ Doctors</button>
        </motion.div>
      </div>
    </section>
  )
}
