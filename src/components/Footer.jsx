import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import './Footer.css'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Facilities', to: '/facilities' },
    { label: 'Specialities', to: '/#specialities' },
    { label: 'Find a Doctor', to: '/#doctors' },
    { label: 'Book Appointment', to: '/#booking' },
  ],
  'Specialities': [
    { label: 'Cardiac Sciences', to: '/#specialities' },
    { label: 'Oncology', to: '/#specialities' },
    { label: 'Neurosciences', to: '/#specialities' },
    { label: 'Orthopaedics', to: '/#specialities' },
    { label: 'Gastroenterology', to: '/#specialities' },
    { label: 'Nephrology', to: '/#specialities' },
  ],
  'Patient Info': [
    { label: 'Online Lab Reports', to: '/lab-reports' },
    { label: 'International Patients', to: '/#contact' },
    { label: 'Insurance Partners', to: '/#contact' },
    { label: 'Patient Rights', to: '/about' },
    { label: 'Feedback', to: '/#contact' },
    { label: 'Careers', to: '/careers' },
  ],
  'Hospitals': [
    { label: 'Noida – Sector 110', to: '/#contact' },
    { label: 'Greater Noida', to: '/#contact' },
    { label: 'Noida Extension', to: '/#contact' },
    { label: 'Contact Us', to: '/#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo.svg" alt="Yatharth Hospitals" className="footer-logo-img" />
              </div>
              <p className="footer-about">
                A leading super-speciality hospital chain providing world-class medical care across Delhi NCR since 2008. NABH accredited, JCI candidate.
              </p>
              <div className="footer-contact-items">
                <a href="tel:+919810059005" className="footer-contact-item">
                  <Phone size={14} /> +91 9810059005 (Emergency)
                </a>
                <a href="tel:01204588000" className="footer-contact-item">
                  <Phone size={14} /> 0120-4588000 (Helpline)
                </a>
                <a href="mailto:info@yatharthhospitals.com" className="footer-contact-item">
                  <Mail size={14} /> info@yatharthhospitals.com
                </a>
              </div>
              <div className="footer-socials">
                {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="social-link" aria-label="Social">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-links-col">
                <h4 className="footer-col-title">{title}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link.label}>
                      {link.to.startsWith('/#') ? (
                        <a href={link.to} className="footer-link">{link.label}</a>
                      ) : (
                        <Link to={link.to} className="footer-link">{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations Strip */}
      <div className="footer-locations">
        <div className="container">
          <div className="locations-grid">
            {[
              { area: 'Noida', addr: 'Plot No. 1, Sector 110, Noida – 201304' },
              { area: 'Greater Noida', addr: 'Omicron-I Extension, Greater Noida – 201308' },
              { area: 'Noida Extension', addr: 'Crossing Republik, Ghaziabad – 201016' },
            ].map(loc => (
              <div key={loc.area} className="location-item">
                <MapPin size={14} className="loc-icon" />
                <div>
                  <div className="loc-area">{loc.area}</div>
                  <div className="loc-addr">{loc.addr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© 2025 Yatharth Hospital & Trauma Care – All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
