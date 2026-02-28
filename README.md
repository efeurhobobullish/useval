# Useval

**Useval** is a full-stack platform for creating and sending digital Valentine cards with airtime gifts. This repository contains the **frontend** (user app), **backend** (API server), and **admin** (dashboard) applications.

---

## Repository structure

| Folder | Role | Description |
|--------|------|-------------|
| **`useval`** | Frontend | React + Vite app for users: auth, cards, wallet, gifts. |
| **`useval-server`** | Backend | Node.js + Express API: auth, users, valentines, wallet, transactions, airtime. |
| **`admin`** | Admin | React + Vite admin dashboard: login, dashboard, users, valentines, transactions. |

You can rename `useval` → `frontend` and `useval-server` → `backend` if you prefer those names.

---

## Quick start

### Backend

```bash
cd useval-server
cp .env.sample .env   # if present, then edit .env
npm install
npm run dev
```

Runs at **http://localhost:5000** (or `PORT` from env).

### Frontend

```bash
cd useval
npm install
npm run dev
```

Runs at **http://localhost:3000**.

### Admin

```bash
cd admin
npm install
npm run dev
```

Runs at **http://localhost:3001**. Sign in with an admin account (OTP); the backend must have a user with `isAdmin: true`.

**Default admin (after running seed):** `admin@useval.com` / `Admin123!`

```bash
# Create default admin (run once from backend folder)
cd useval-server
npm run seed
```

---

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS, React Router, TanStack Query, Zustand.
- **Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT, Nodemailer, Cron.
- **Admin:** Same stack as frontend; admin-only routes and cookie-based admin auth.

---

## Documentation

- [Frontend (useval)](./useval/README.md)
- [Backend (useval-server)](./useval-server/README.md)
- [Admin](./admin/README.md)

---

## License

See [LICENSE](./LICENSE) if present.
