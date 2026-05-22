# Plainfold

> *See what you owe. In plain English.*

A quiet place for difficult numbers. Organize debt, collections, and payoff plans in one authenticated dashboard.

[![Live Demo](https://img.shields.io/badge/live-plainfold.app-1a1814?style=flat-square)](https://plainfold.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Node](https://img.shields.io/badge/Node-22-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-a08552?style=flat-square)](LICENSE)

**[Live Demo](https://plainfold.app)** · **[Report an Issue](https://github.com/ramksharma1/plainfold/issues)** · **[Author](https://www.linkedin.com/in/ram-sharma-2507991a8)**

---

## Why Plainfold exists

I built Plainfold because I saw myself, my family, and many of my friends overwhelmed by collection notices — not knowing how to retrieve the correct information, and without a single place to make sense of it all.

Debt confusion isn't really a math problem. It's an organization problem. Most people don't need another calculator that tells them how long it will take to pay things off — they need to *see what they actually owe*, who actually holds the debt today, and where it came from. That clarity is the first step toward feeling in control again.

Plainfold is a quiet, calm, no-upsell place to bring all of that information together.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---
## ✨ Features

**Available now**
- 📄 Editorial landing page with calm, library-inspired aesthetic
- 🎯 Dashboard placeholder showing total owed and brand identity
- 🔌 Full-stack handshake: React client connected to Express server via REST API
- 🛡️ Environment variable handling with `.env` properly ignored by Git
- 🚀 Continuous deployment via Vercel — every push to `main` redeploys

**In progress / coming next**
- 🔐 User authentication (register, login, JWT-based sessions)
- 💾 Persistent storage with MongoDB Atlas (the "M" in MERN)
- ✍️ Manual debt entry — add accounts, balances, interest rates, statuses
- 📥 Credit report PDF upload and parsing (text-based and OCR fallback)
- 🔗 Chain-of-custody tracking — see how a debt moves from original creditor to collections
- 🧮 Payoff planner — Avalanche vs. Snowball strategy comparison
- 📊 Visual payoff timeline with projected debt-free date

---

## 🛠 Tech Stack

Plainfold is built on the MERN stack (MongoDB, Express, React, Node) with a few additional choices made deliberately:

| Layer | Technology | Why this choice |
|---|---|---|
| **Frontend framework** | [React 19](https://react.dev) | Component-based UI is ideal for repeated elements (debt cards, account rows). Industry standard. |
| **Build tool** | [Vite 6](https://vite.dev) | Fast dev server with hot module replacement. Replaces deprecated Create React App. |
| **Backend framework** | [Express 5](https://expressjs.com) | Minimal, unopinionated Node.js framework. Easy to reason about. |
| **Runtime** | [Node.js 22](https://nodejs.org) | LTS version with modern ES modules support. |
| **Database** *(planned)* | [MongoDB Atlas](https://www.mongodb.com/atlas) | Document model fits Plainfold's nested debt records (chain of custody, status history). Free tier sufficient for v1. |
| **Authentication** *(planned)* | JWT + bcrypt | Stateless tokens, hashed passwords. Standard for self-hosted auth. |
| **PDF parsing** *(planned)* | `pdf-parse` + `tesseract.js` | Free, self-hosted OCR. Credit reports never leave the user's server — important for a debt app. |
| **Hosting (frontend)** | [Vercel](https://vercel.com) | Auto-deploys on push, generous free tier, owns the `plainfold.app` domain. |
| **Hosting (backend)** *(planned)* | [Render](https://render.com) or [Railway](https://railway.app) | Free tier sufficient for portfolio scale. |
| **Domain** | `plainfold.app` | Owned via Namecheap. HTTPS enforced by Google (mandatory for `.app`). |

---

## 🏗 Architecture

Plainfold follows a standard client–server separation. The frontend and backend are independent applications that communicate over HTTP using JSON.

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │  HTTP   │                  │  Driver │                  │
│  REACT CLIENT    │ ──────► │  EXPRESS SERVER  │ ──────► │   MONGODB ATLAS  │
│  (Vite, port     │         │  (Node, port     │         │   (planned)      │
│   5173 local)    │ ◄────── │   5000 local)    │ ◄────── │                  │
│                  │  JSON   │                  │  Docs   │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
       │                              │                            │
       │                              │                            │
       ▼                              ▼                            ▼
  Renders UI,                  Routes, auth,                User & debt
  handles state,               business logic,              records,
  calls API                    PDF parsing                  chain of custody
```

**Key design decisions:**

- **Separation of concerns.** The client knows nothing about the database; the server knows nothing about the DOM. Each can be developed, tested, and deployed independently.
- **Stateless authentication.** JWT tokens mean the server doesn't have to track sessions in memory or in a Redis store. Simpler infrastructure.
- **Privacy-first PDF parsing.** All credit report parsing happens on the server using open-source libraries — never sent to third-party APIs like Google Cloud Vision. Important for a financial app handling sensitive data.
- **One source of truth per debt.** A debt's full history (original creditor → collections agency → balance changes) lives in a single document, not scattered across joins.

For more depth, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 📁 Project Structure

```
plainfold/
├── client/                       # React frontend (Vite + React 19)
│   ├── public/                   # Static assets served as-is
│   ├── src/
│   │   ├── App.jsx               # Main app component, currently houses dashboard
│   │   ├── App.css               # Component styles
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                       # Express backend (Node 22 + Express 5)
│   ├── src/
│   │   └── index.js              # Server entry, routes, middleware
│   ├── .env                      # Local environment variables (NOT committed)
│   ├── .gitignore
│   └── package.json
│
├── landing-preview/              # Editorial landing page (static HTML)
│   └── index.html                # Deployed to plainfold.app via Vercel
│
├── docs/                         # Project documentation
│   ├── ARCHITECTURE.md           # System design decisions
│   ├── API.md                    # API endpoint reference
│   ├── PDF_PARSING.md            # Credit report parsing strategy
│   └── DECISIONS.md              # Architecture Decision Records (ADRs)
│
├── .gitignore                    # Root-level ignore rules
├── LICENSE                       # MIT
└── README.md                     # You are here
```

---