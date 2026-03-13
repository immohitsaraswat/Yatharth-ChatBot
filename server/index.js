import express from 'express'
import cors from 'cors'
import db from './db.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Endpoints

// 1. Book an appointment
app.post('/api/book', (req, res) => {
  const { name, phone, speciality, location, date, time, note, source } = req.body

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and Phone Number are required.' })
  }

  const insertQuery = `
    INSERT INTO appointments (name, phone, speciality, location, date, time, note, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.run(
    insertQuery,
    [name, phone, speciality, location, date, time, note, source || 'form'],
    function (err) {
      if (err) {
        console.error('Error saving appointment:', err.message)
        return res.status(500).json({ error: 'Failed to save appointment.' })
      }
      res.status(200).json({
        message: 'Appointment successfully booked!',
        appointmentId: this.lastID,
      })
    }
  )
})

// 2. Get all appointments (for verification/admin panel later)
app.get('/api/appointments', (req, res) => {
  const selectQuery = `SELECT * FROM appointments ORDER BY created_at DESC`
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error('Error fetching appointments:', err.message)
      return res.status(500).json({ error: 'Failed to fetch appointments.' })
    }
    res.status(200).json(rows)
  })
})

// --- Serve Frontend in Production ---
// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`)
})
