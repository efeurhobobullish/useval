# Useval — Frontend (User App)

User-facing web app for **Useval**: create and share digital Valentine cards and fund wallets for airtime gifts.

---

## Overview

| Area | Features |
|------|----------|
| **Auth** | Register, OTP verification, login |
| **Cards** | Create, view, and share Valentine cards; send gifts; success flow |
| **Wallet** | Balance, fund wallet, transaction history |
| **Stack** | React 19, TypeScript, Vite 7, Tailwind CSS, React Router, TanStack Query, Zustand, Framer Motion |

---

## Prerequisites

- **Node.js** (v18+)
- **Backend API** running — see [useval-server](../useval-server/README.md)

---

## Setup

```bash
cd useval
npm install
```

Optional: create a `.env` file and set `VITE_API_URL` to your backend URL. If omitted, the app uses `http://localhost:5000` in development and the configured production API in build.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server → **http://localhost:3000** |
| `npm run build` | Type-check and production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── components/   # Reusable UI and feature components
├── config/       # API and app config
├── constants/    # Static data
├── helpers/      # Utilities
├── hooks/        # useAuth, useWallet, useValentines, useTransactions, useTheme
├── layouts/      # Main layout, card layout
├── pages/        # Auth, home, wallet, create-card, card, gift, success, protect
├── store/        # Zustand (e.g. theme)
├── types.d.ts    # Shared TS types
├── App.tsx       # Routes and global UI
├── main.tsx      # Entry, providers
└── index.css     # Tailwind and theme
```

---

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (optional) |

---

## Deployment

Build output is in `dist/`. Deploy to any static host (e.g. Vercel, Netlify). Set `VITE_API_URL` for production if your API is on a different origin.
