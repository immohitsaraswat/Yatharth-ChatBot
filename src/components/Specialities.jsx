import { motion } from 'framer-motion'
import {
  Heart, Brain, Bone, Microscope, Activity,
  Stethoscope, Eye, Baby, Pill, Scan,
  ArrowRight
} from 'lucide-react'
import './Specialities.css'

const specialities = [
  {
    id: 'cardiac',
    icon: <Heart size={28} />,
    name: 'Cardiac Sciences',
    tagline: 'Heart & Vascular',
    color: '#e74c3c',
    colorLight: 'rgba(231, 76, 60, 0.08)',
    desc: 'Advanced cardiac care including bypass surgery, angioplasty, and pacemaker implants.',
  },
  {
    id: 'oncology',
    icon: <Microscope size={28} />,
    name: 'Oncology',
    tagline: 'Cancer Care',
    color: '#8e44ad',
    colorLight: 'rgba(142, 68, 173, 0.08)',
    desc: 'Comprehensive cancer treatment including CAR T-cell therapy and bone marrow transplants.',
  },
  {
    id: 'neuro',
    icon: <Brain size={28} />,
    name: 'Neurosciences',
    tagline: 'Brain & Spine',
    color: '#2980b9',
    colorLight: 'rgba(41, 128, 185, 0.08)',
    desc: 'Expert neurological care for stroke, epilepsy, brain tumors, and spine disorders.',
  },
  {
    id: 'ortho',
    icon: <Bone size={28} />,
    name: 'Orthopaedics',
    tagline: 'Joints & Bones',
    color: '#27ae60',
    colorLight: 'rgba(39, 174, 96, 0.08)',
    desc: 'Joint replacement, sports injuries, and robotic orthopedic surgeries.',
  },
  {
    id: 'gastro',
    icon: <Activity size={28} />,
    name: 'Gastroenterology',
    tagline: 'Digestive Health',
    color: '#e67e22',
    colorLight: 'rgba(230, 126, 34, 0.08)',
    desc: 'Endoscopy, liver care, and advanced GI surgeries by seasoned gastroenterologists.',
  },
  {
    id: 'nephro',
    icon: <Stethoscope size={28} />,
    name: 'Nephrology',
    tagline: 'Kidney & Urology',
    color: '#16a085',
    colorLight: 'rgba(22, 160, 133, 0.08)',
    desc: 'Kidney transplant, dialysis programs, and comprehensive urological care.',
  },
  {
    id: 'ophthal',
    icon: <Eye size={28} />,
    name: 'Ophthalmology',
    tagline: 'Eye Care',
    color: '#2c3e50',
    colorLight: 'rgba(44, 62, 80, 0.08)',
    desc: 'Advanced eye surgeries including LASIK, cataract, and retinal treatments.',
  },
  {
    id: 'pediatrics',
    icon: <Baby size={28} />,
    name: 'Paediatrics',
    tagline: 'Child Health',
    color: '#f39c12',
    colorLight: 'rgba(243, 156, 18, 0.08)',
    desc: 'Neonatal care, pediatric surgery and comprehensive child healthcare services.',
  },
  {
    id: 'pharma',
    icon: <Pill size={28} />,
    name: 'Robotic Surgery',
    tagline: 'Advanced Tech',
    color: '#c0392b',
    colorLight: 'rgba(192, 57, 43, 0.08)',
    desc: 'Minimally invasive robotic surgeries with precision and faster recovery times.',
  },
  {
    id: 'radiology',
    icon: <Scan size={28} />,
    name: 'Radiology',
    tagline: 'Imaging & Diagnostics',
    color: '#1a5276',
    colorLight: 'rgba(26, 82, 118, 0.08)',
    desc: 'MRI, CT scans, PET scans, and nuclear medicine with cutting-edge equipment.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Specialities() {
  return (
    <section className="specialities-section" id="specialities">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Our Expertise</div>
          <h2 className="section-title">World-Class <span className="gradient-text">Specialities</span></h2>
          <p className="section-subtitle">
            From routine check-ups to complex multi-organ surgeries — our team of 200+ expert doctors delivers excellence across 15+ medical specialities.
          </p>
        </motion.div>

        <motion.div
          className="specialities-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specialities.map((spec) => (
            <motion.div
              key={spec.id}
              className="spec-card"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{ '--spec-color': spec.color, '--spec-bg': spec.colorLight }}
            >
              <div className="spec-icon-wrap">
                {spec.icon}
              </div>
              <div className="spec-content">
                <div className="spec-tag">{spec.tagline}</div>
                <h3 className="spec-name">{spec.name}</h3>
                <p className="spec-desc">{spec.desc}</p>
              </div>
              <a href="#booking" className="spec-cta" id={`spec-cta-${spec.id}`}>
                Book Now <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
