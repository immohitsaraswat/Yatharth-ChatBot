import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  {
    label: 'About Us',
    href: '#home',
  },
  {
    label: 'Specialities',
    href: '#specialities',
    dropdown: [
      'Cardiac Sciences', 'Oncology', 'Neurosciences',
      'Orthopaedics', 'Nephrology & Urology', 'Gastroenterology',
      'GI Surgery & Liver Transplant', 'Robotic Surgery'
    ]
  },
  { label: 'Find Doctors', href: '#doctors' },
  { label: 'Facilities', href: '#home' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Online Lab Reports portal is currently under maintenance. Please check back later.'); }} className="topbar-link">Online Lab Reports</a>
              <a href="#contact" className="topbar-link">International Patients</a>
              <a href="#contact" className="topbar-link">Careers</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="navbar-main">
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <a href="#home" className="nav-logo">
              <img src="/logo.svg" alt="Yatharth Hospitals" className="nav-logo-img" />
            </a>

            {/* Desktop Nav Links */}
            <nav className="nav-links">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="nav-item"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a href={link.href} className="nav-link">
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} />}
                  </a>
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
                          <a key={item} href="#specialities" className="dropdown-item">{item}</a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="nav-actions">
              <a href="#booking" className="btn btn-primary nav-cta" id="nav-book-btn">
                Book Appointment
              </a>
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
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="mobile-link" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="#booking" className="btn btn-primary mobile-cta" onClick={() => setMobileOpen(false)}>
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
