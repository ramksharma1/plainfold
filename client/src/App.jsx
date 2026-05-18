import './App.css'

function App() {
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
      </main>
    </div>
  )
}

export default App
