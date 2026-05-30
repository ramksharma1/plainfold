import { useState, useEffect } from 'react'
import DebtForm from './components/DebtForm'
import DebtList from './components/DebtList'
import { getDebts, createDebt, deleteDebt } from './lib/api'
import './App.css'

function App() {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all debts from the server when the app first loads
  useEffect(() => {
    loadDebts()
  }, [])

  async function loadDebts() {
    try {
      setLoading(true)
      setError(null)
      const data = await getDebts()
      setDebts(data)
    } catch (err) {
      setError('Could not load your debts. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  // Create a debt on the server, then refresh the list
  async function handleAddDebt(newDebt) {
    try {
      setError(null)
      await createDebt(newDebt)
      await loadDebts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete a debt on the server, then refresh the list
  async function handleDeleteDebt(id) {
    try {
      setError(null)
      await deleteDebt(id)
      await loadDebts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Total owed, calculated from the current debts
  const totalOwed = debts.reduce((sum, debt) => sum + debt.balance, 0)
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalOwed)

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark"></span>
          Plainfold
        </div>
      </header>

      <main className="main">
        <div className="page-intro">
          <h1 className="title">Dashboard</h1>
          <p className="subtitle">Your debt, organized.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="dashboard-grid">
          <div className="total-card">
            <p className="total-label">Total Owed</p>
            <p className="total-amount">{formattedTotal}</p>
            <p className="total-meta">
              {debts.length === 0
                ? 'No debts added yet'
                : `Across ${debts.length} ${debts.length === 1 ? 'account' : 'accounts'}`}
            </p>
          </div>

          <DebtForm onAddDebt={handleAddDebt} />
        </div>

        <div className="debt-list-wrapper">
          {loading ? (
            <div className="loading-state">Loading your debts…</div>
          ) : (
            <DebtList debts={debts} onDelete={handleDeleteDebt} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App