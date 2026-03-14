import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'About Us', to: '/about' },
  {
    label: 'Specialities',
    to: '/#specialities',
    dropdown: [
      'Cardiac Sciences', 'Oncology', 'Neurosciences',
      'Orthopaedics', 'Nephrology & Urology', 'Gastroenterology',
      'GI Surgery & Liver Transplant', 'Robotic Surgery'
    ]
  },
  { label: 'Find Doctors', to: '/#doctors' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash scrolling for same-page anchors
  const handleNavClick = (to) => {
    setMobileOpen(false)
    if (to.startsWith('/#')) {
      const id = to.replace('/#', '')
      if (location.pathname === '/') {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = to
      }
    }
  }

  const isRoute = (to) => !to.startsWith('/#')

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Top Bar */}
      <div className="navbar-topbar">
        <div className="container">
          <div className="topbar-inner">
            <div className="topbar-left">
              <Phone size={13} />
              <span>Emergency: <strong>+91 9810059005</strong></span>
              <span className="topbar-divider">|</span>
              <span>24/7 Helpline: <strong>0120-4588000</strong></span>
            </div>
            <div className="topbar-right">
              <Link to="/lab-reports" className="topbar-link">Online Lab Reports</Link>
              <Link to="/#contact" onClick={() => handleNavClick('/#contact')} className="topbar-link">International Patients</Link>
              <Link to="/careers" className="topbar-link">Careers</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="navbar-main">
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <Link to="/" className="nav-logo">
              <img src="/logo.svg" alt="Yatharth Hospitals" className="nav-logo-img" />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="nav-links">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="nav-item"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {isRoute(link.to) ? (
                    <Link to={link.to} className="nav-link">
                      {link.label}
                      {link.dropdown && <ChevronDown size={14} />}
                    </Link>
                  ) : (
                    <a href={link.to} className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick(link.to) }}>
                      {link.label}
                      {link.dropdown && <ChevronDown size={14} />}
                    </a>
                  )}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        className="nav-dropdown"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18 }}
                      >
                        {link.dropdown.map((item) => (
                          <a key={item} href="/#specialities" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('/#specialities') }}>{item}</a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="nav-actions">
              <Link to="/#booking" onClick={() => handleNavClick('/#booking')} className="btn btn-primary nav-cta" id="nav-book-btn">
                Book Appointment
              </Link>
              <button
                className="nav-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              {navLinks.map((link) =>
                isRoute(link.to) ? (
                  <Link key={link.label} to={link.to} className="mobile-link" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.to} className="mobile-link" onClick={(e) => { e.preventDefault(); handleNavClick(link.to) }}>
                    {link.label}
                  </a>
                )
              )}
              <Link to="/#booking" onClick={() => handleNavClick('/#booking')} className="btn btn-primary mobile-cta">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
