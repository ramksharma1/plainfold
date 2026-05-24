import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Debt from './models/Debt.js'

// Load environment variables from .env
dotenv.config()

// Build the MongoDB connection string from individual .env variables
const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`

// Connect to MongoDB before starting the server
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('🍃 Connected to MongoDB Atlas')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

// Create the Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// ─────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Plainfold server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

// ─────────────────────────────────────────────
// Debt routes
// ─────────────────────────────────────────────

// GET /api/debts — list all debts, newest first
app.get('/api/debts', async (req, res) => {
  try {
    const debts = await Debt.find().sort({ createdAt: -1 })
    res.json(debts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch debts', details: error.message })
  }
})

// POST /api/debts — create a new debt
app.post('/api/debts', async (req, res) => {
  try {
    const newDebt = await Debt.create(req.body)
    res.status(201).json(newDebt)
  } catch (error) {
    // If Mongoose validation fails, return a 400 with the details
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.message })
    }
    res.status(500).json({ error: 'Failed to create debt', details: error.message })
  }
})

// DELETE /api/debts/:id — remove a debt by ID
app.delete('/api/debts/:id', async (req, res) => {
  try {
    const deleted = await Debt.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Debt not found' })
    }

    res.json({ message: 'Debt deleted', id: req.params.id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete debt', details: error.message })
  }
})

// ─────────────────────────────────────────────
// Start everything
// ─────────────────────────────────────────────

const PORT = process.env.PORT || 5000

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Plainfold server running on http://localhost:${PORT}`)
  })
})