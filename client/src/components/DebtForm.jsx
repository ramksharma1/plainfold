import { useState } from 'react'
import './DebtForm.css'

function DebtForm({ onAddDebt }) {
  // Local state — holds the current values of each form field
  const [creditor, setCreditor] = useState('')
  const [balance, setBalance] = useState('')
  const [apr, setApr] = useState('')
  const [minPayment, setMinPayment] = useState('')
  const [status, setStatus] = useState('current')

  // What happens when the form is submitted
  function handleSubmit(event) {
    event.preventDefault()  // stop the page from reloading

    // Don't allow empty submissions
    if (!creditor.trim() || !balance) return

    // Build the new debt object
    const newDebt = {
      id: Date.now(),               // simple unique ID for now
      creditor: creditor.trim(),
      balance: parseFloat(balance),
      apr: parseFloat(apr) || 0,
      minPayment: parseFloat(minPayment) || 0,
      status,
    }

    // Send it up to the parent (App.jsx)
    onAddDebt(newDebt)

    // Reset the form
    setCreditor('')
    setBalance('')
    setApr('')
    setMinPayment('')
    setStatus('current')
  }

  return (
    <div className="debt-form-card">
      <h2 className="debt-form-title">Add a debt</h2>

      <form onSubmit={handleSubmit} className="debt-form">
        <div className="field">
          <label htmlFor="creditor">Creditor</label>
          <input
            id="creditor"
            type="text"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
            placeholder="Capital One, Chase, Mercy Medical…"
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="balance">Balance ($)</label>
            <input
              id="balance"
              type="number"
              step="0.01"
              min="0"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="apr">APR (%)</label>
            <input
              id="apr"
              type="number"
              step="0.01"
              min="0"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="minPayment">Minimum payment ($)</label>
            <input
              id="minPayment"
              type="number"
              step="0.01"
              min="0"
              value={minPayment}
              onChange={(e) => setMinPayment(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="current">Current</option>
              <option value="late_30">30 days late</option>
              <option value="late_60">60 days late</option>
              <option value="charge_off">Charge-off</option>
              <option value="in_collection">In collection</option>
            </select>
          </div>
        </div>

        <button type="submit" className="debt-form-submit">
          Add debt
        </button>
      </form>
    </div>
  )
}

export default DebtForm