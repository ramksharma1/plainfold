import { useState } from 'react'
import './App.css'

function App() {
  // State to hold the server's response
  const [serverStatus, setServerStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Function that runs when the button is clicked
  async function checkBackend() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/health')
      const data = await response.json()
      setServerStatus(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark"></span>
          Plainfold
        </div>
      </header>

      <main className="main">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">
          Your debt, organized. Coming soon.
        </p>

        <div className="placeholder-card">
          <p className="placeholder-label">Total Owed</p>
          <p className="placeholder-amount">$0.00</p>
          <p className="placeholder-meta">No debts added yet</p>
        </div>

        <div className="backend-check">
          <button onClick={checkBackend} disabled={loading} className="check-button">
            {loading ? 'Checking...' : 'Check Backend Connection'}
          </button>

          {serverStatus && (
            <div className="status-card status-ok">
              <p className="status-label">Server Response</p>
              <p className="status-line"><strong>Status:</strong> {serverStatus.status}</p>
              <p className="status-line"><strong>Message:</strong> {serverStatus.message}</p>
              <p className="status-line"><strong>Timestamp:</strong> {serverStatus.timestamp}</p>
            </div>
          )}

          {error && (
            <div className="status-card status-error">
              <p className="status-label">Connection Failed</p>
              <p className="status-line">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App