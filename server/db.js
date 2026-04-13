import sqlite3 from 'sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'database.sqlite')

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message)
  } else {
    console.log('✅ Connected to SQLite database.')
  }
})

// Create the appointments table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    speciality TEXT,
    location TEXT,
    date TEXT,
    time TEXT,
    note TEXT,
    source TEXT DEFAULT 'form',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating appointments table:', err.message)
  } else {
    console.log('✅ Appointments table is ready.')
  }
})

export default db
