# Useval — Backend API

Node.js API for **Useval**: digital Valentine cards, wallet, airtime, and rewards. Handles user auth (JWT), admin auth (cookie), deposits, transactions, and email (OTP, templates).

---

## Overview

| Area | Description |
|------|-------------|
| **Auth** | Register, OTP request/resend/verify, login, check, logout; admin login/check/logout via cookie `admin_token` |
| **Users** | Profile and wallet-related user endpoints |
| **Valentines** | Create, read, update valentine cards; cron for expiring cards |
| **Wallet** | Balance, fund wallet, withdrawals |
| **Transactions** | Transaction history |
| **Admin** | Admin-only routes (e.g. deposits, users, stats) under `/v1/admin` |
| **Airtime** | Airtime purchase; admin-only listing |
| **Stack** | Express 5, MongoDB (Mongoose), JWT, Nodemailer, node-cron, cookie-parser |

---

## Prerequisites

- **Node.js** v24+ (see `engines` in `package.json`)
- **MongoDB** connection string
- **Env** — see [Environment](#environment)

---

## Setup

```bash
git clone https://github.com/efeurhobobullish/useval-server.git
cd useval-server
npm install
cp .env.sample .env   # if present
# Edit .env: MONGODB_URI, JWT_SECRET, email, etc.
npm run dev
```

Server runs at **http://localhost:5000** (or `PORT` from env).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run with watch and `--env-file=.env` |
| `npm start` | Production run |
| `npm run seed` | Create/update default admin: **admin@useval.com** / **Admin123!** (requires MongoDB) |

---

## API structure

| Prefix | Description |
|--------|-------------|
| `GET /` | Health / welcome |
| `GET /ping` | Liveness |
| `/v1/auth` | Register, OTP, verify, login, check, logout; admin login/check/logout |
| `/v1/users` | User routes |
| `/v1/valentine` | Valentine CRUD |
| `/v1/wallet` | Wallet operations |
| `/v1/transactions` | Transactions |
| `/v1/airtime` | Airtime (includes admin-only listing) |
| `/v1/admin` | Admin-only routes (deposits, users, stats, etc.) |

Admin routes require cookie `admin_token` and a user with `isAdmin: true`.

---

## Project structure

```
src/
├── config/      # Database, email, external APIs
├── controllers/ # Auth, user, valentine, wallet, transaction, otp, airtime, admin
├── cron/        # expireValentines
├── middleware/  # auth.middleware, admin.middleware
├── models/      # user, valentine, transaction, otp, airtime
├── routes/      # Per-resource routers
├── template/    # Email HTML (welcome, login, deposit)
├── utils/       # sendEmail, onError, generateCodes, etc.
└── index.js     # App entry, CORS, routes
```

---

## Environment

Use a `.env` file (see `.env.sample` if present). Typical variables:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT and `admin_token` |
| Email (Nodemailer) and any third-party API keys (e.g. airtime) |

---

## CORS

Allowed origins include localhost (3000, 5173, 3001) and production frontend/admin URLs. Adjust in `src/index.js` as needed.

---

## Related repositories

- **Frontend & Admin** — [efeurhobobullish/useval](https://github.com/efeurhobobullish/useval)

---

## License

ISC (see `package.json`).
