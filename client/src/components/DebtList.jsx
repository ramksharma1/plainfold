import './DebtList.css'

// Helper: format a number as US currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Helper: turn a status code into a friendly label
function formatStatus(status) {
  const labels = {
    current: 'Current',
    late_30: '30 days late',
    late_60: '60 days late',
    charge_off: 'Charge-off',
    in_collection: 'In collection',
  }
  return labels[status] || status
}

// Helper: turn a status code into a color category for styling
function statusTone(status) {
  if (status === 'current') return 'tone-ok'
  if (status === 'late_30' || status === 'late_60') return 'tone-warn'
  if (status === 'charge_off' || status === 'in_collection') return 'tone-bad'
  return 'tone-neutral'
}

function DebtList({ debts, onDelete }) {
  // Empty state — when there are no debts yet
  if (debts.length === 0) {
    return (
      <div className="debt-list-empty">
        <p className="empty-label">Your debts</p>
        <p className="empty-message">
          No debts added yet. Use the form to add your first one.
        </p>
      </div>
    )
  }

  // Loaded state — render each debt as a row
  return (
    <div className="debt-list">
      <div className="debt-list-header">
        <h2 className="debt-list-title">Your debts</h2>
        <p className="debt-list-count">
          {debts.length} {debts.length === 1 ? 'account' : 'accounts'}
        </p>
      </div>

      <ul className="debt-list-rows">
        {debts.map((debt) => (
          <li key={debt._id} className="debt-row">
            <div className="debt-row-main">
              <p className="debt-creditor">{debt.creditor}</p>
              <p className={`debt-status ${statusTone(debt.status)}`}>
                {formatStatus(debt.status)}
              </p>
            </div>

            <div className="debt-row-numbers">
              <div className="debt-figure">
                <span className="debt-figure-label">Balance</span>
                <span className="debt-figure-value">
                  {formatCurrency(debt.balance)}
                </span>
              </div>

              <div className="debt-figure">
                <span className="debt-figure-label">APR</span>
                <span className="debt-figure-value">
                  {debt.apr.toFixed(2)}%
                </span>
              </div>

              <div className="debt-figure">
                <span className="debt-figure-label">Min/mo</span>
                <span className="debt-figure-value">
                  {formatCurrency(debt.minPayment)}
                </span>
              </div>
            </div>

            <button
              className="debt-delete"
              onClick={() => onDelete(debt._id)}
              aria-label={`Delete ${debt.creditor}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DebtList