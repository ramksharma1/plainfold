import { useState } from 'react'
import DebtForm from './components/DebtForm'
import DebtList from './components/DebtList'
import './App.css'

function App() {
  // The single source of truth for all debts
  const [debts, setDebts] = useState([])

  // Add a new debt to the array
  function handleAddDebt(newDebt) {
    setDebts((prev) => [...prev, newDebt])
  }

  // Remove a debt by ID
  function handleDeleteDebt(id) {
    setDebts((prev) => prev.filter((debt) => debt.id !== id))
  }

  // Derived value — total owed is calculated from the debts array
  const totalOwed = debts.reduce((sum, debt) => sum + debt.balance, 0)

  // Format the total nicely for display
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
          <DebtList debts={debts} onDelete={handleDeleteDebt} />
        </div>
      </main>
    </div>
  )
}

export default App