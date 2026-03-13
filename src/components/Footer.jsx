import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, Heart } from 'lucide-react'
import './Footer.css'

const footerLinks = {
  'Quick Links': ['Home', 'About Us', 'Our Hospitals', 'Specialities', 'Find a Doctor', 'Book Appointment'],
  'Specialities': ['Cardiac Sciences', 'Oncology', 'Neurosciences', 'Orthopaedics', 'Gastroenterology', 'Nephrology'],
  'Patient Info': ['Online Lab Reports', 'International Patients', 'Insurance Partners', 'Patient Rights', 'Feedback', 'Careers'],
  'Hospitals': ['Noida – Sector 110', 'Greater Noida', 'Noida Extension', 'Contact All'],
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
                  <button key={i} onClick={() => alert('Social media profile link coming soon!')} className="social-link" aria-label="Social">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-links-col">
                <h4 className="footer-col-title">{title}</h4>
                <ul>
                  {links.map(link => {
                    // Try to guess a reasonable anchor for the link, or fallback to top
                    let href = '#home';
                    const linkLower = link.toLowerCase();
                    if (linkLower.includes('doctor')) href = '#doctors';
                    if (linkLower.includes('special')) href = '#specialities';
                    if (linkLower.includes('book') || linkLower.includes('contact')) href = '#booking';
                    
                    return (
                      <li key={link}>
                        <a href={href} className="footer-link">{link}</a>
                      </li>
                    );
                  })}
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
              <button className="text-muted" style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => alert('Privacy Policy coming soon')}>Privacy Policy</button>
              <button className="text-muted" style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => alert('Terms of Use coming soon')}>Terms of Use</button>
              <button className="text-muted" style={{background:'none',border:'none',color:'inherit',cursor:'pointer',fontSize:'0.9rem'}} onClick={() => alert('Sitemap coming soon')}>Sitemap</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
