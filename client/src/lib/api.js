// src/lib/api.js
//
// All HTTP calls to the Plainfold backend live here.
// React components import these functions and never deal with fetch() directly.

const API_BASE = 'http://localhost:5000/api'

// ─────────────────────────────────────────────
// Debts
// ─────────────────────────────────────────────

// GET /api/debts — fetch all debts
export async function getDebts() {
  const response = await fetch(`${API_BASE}/debts`)

  if (!response.ok) {
    throw new Error(`Failed to fetch debts: ${response.status}`)
  }

  return response.json()
}

// POST /api/debts — create a new debt
export async function createDebt(debt) {
  const response = await fetch(`${API_BASE}/debts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(debt),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.error || `Failed to create debt: ${response.status}`)
  }

  return response.json()
}

// DELETE /api/debts/:id — remove a debt
export async function deleteDebt(id) {
  const response = await fetch(`${API_BASE}/debts/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete debt: ${response.status}`)
  }

  return response.json()
}