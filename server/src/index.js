import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Create the Express app
const app = express()

// Middleware — runs on every request before reaching routes
app.use(cors())                        // Allow cross-origin requests (from your React app)
app.use(express.json())                // Parse incoming JSON request bodies

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Plainfold server is running',
    timestamp: new Date().toISOString()
  })
})

// Start the server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Plainfold server running on http://localhost:${PORT}`)
})