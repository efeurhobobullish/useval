# Useval — Admin Dashboard

React + Vite admin app for **Useval**: manage users, deposits, valentines, and transactions. Uses the same design system and backend as the user app, with cookie-based admin auth.

---

## Overview

| Area | Features |
|------|----------|
| **Auth** | Admin login (email + password); cookie `admin_token`; protected routes |
| **Dashboard** | Stats overview (users, deposits, valentines, transactions) |
| **Deposits** | List and confirm deposit requests |
| **Users** | List and manage users |
| **Valentines** | List and manage valentine cards |
| **Transactions** | List and view transactions |
| **Stack** | React 19, TypeScript, Vite 7, Tailwind CSS, React Router, TanStack Query, Zustand |

---

## Prerequisites

- **Node.js** (v18+)
- **Backend API** running with admin routes — see [useval-server](../useval-server/README.md)
- **Admin user** in the database (e.g. run `npm run seed` in `useval-server`)

Default admin (after seed): **admin@useval.com** / **Admin123!**

---

## Setup

```bash
cd admin
npm install
```

Optional: create a `.env` file and set `VITE_API_URL` to your backend URL. If omitted, the app uses `http://localhost:5000` in development.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server → **http://localhost:3001** |
| `npm run build` | Type-check and production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── components/   # Reusable UI (modals, etc.)
├── config/       # API client (withCredentials, base URL)
├── hooks/        # useAdminAuth, useAdminStats, useAdminDeposits, useAdminUsers, useAdminValentines, useAdminTransactions
├── layouts/      # Admin layout (sidebar, header)
├── pages/
│   ├── admin/    # Dashboard, Deposits, Users, Valentines, Transactions
│   ├── auth/     # Admin login
│   └── protect.tsx
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

Build output is in `dist/`. Deploy to any static host. Set `VITE_API_URL` for production and ensure the backend allows your admin origin in CORS and cookie settings.
