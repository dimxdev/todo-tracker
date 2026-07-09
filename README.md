# Todo Tracker

Aplikasi Todo Tracker full-stack: REST API backend + frontend yang mengonsumsinya.
Dibuat sebagai take-home test untuk posisi Software Engineer Intern di FOOM Lab Global.

## Tech Stack

**Backend**
- Node.js (ES Modules)
- Express.js — REST API
- Sequelize (ORM) + SQLite
- CORS

**Frontend**
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Struktur Proyek

```
.
├── backend/
│   ├── config/config.cjs             # konfigurasi koneksi database
│   ├── src/
│   │   ├── db/index.js               # instance Sequelize
│   │   ├── modules/todo/             # fitur todo (model, service, controller, routes)
│   │   ├── middleware/               # error handling terpusat
│   │   ├── migrations/               # migration Sequelize
│   │   └── server.js                 # entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── app/                      # halaman & layout (App Router)
    │   ├── features/todo/            # komponen fitur todo
    │   ├── lib/api.ts                # client HTTP ke backend
    │   └── types/todo.ts             # tipe TypeScript
    └── .env.example
```

Backend memakai pola berlapis **routes → controller → service → model**:
- **routes** — memetakan URL ke controller
- **controller** — urusan HTTP: validasi input, status code, response
- **service** — logika bisnis & akses data (tanpa menyentuh req/res)
- **model** — definisi tabel via Sequelize

## Cara Menjalankan

Butuh Node.js (v18+). Jalankan backend dan frontend di dua terminal terpisah.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env          # opsional, ada nilai default
npx sequelize-cli db:migrate  # buat tabel di database.sqlite
npm run dev                   # jalan di http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local    # base URL API
npm run dev                   # jalan di http://localhost:3000
```

Buka http://localhost:3000 di browser.

## REST API

Base URL: `http://localhost:4000`

| Method | Endpoint      | Keterangan       | Body                                         |
|--------|---------------|------------------|----------------------------------------------|
| GET    | `/todos`      | Ambil semua todo | —                                            |
| POST   | `/todos`      | Buat todo baru   | `{ "title", "description?", "completed?" }`  |
| PUT    | `/todos/:id`  | Update todo      | `{ "title?", "description?", "completed?" }` |
| DELETE | `/todos/:id`  | Hapus todo       | —                                            |

**Field todo:** `id` (auto-increment), `title` (string, wajib), `description` (string, opsional), `completed` (boolean, default `false`).

Contoh:
```bash
curl -X POST http://localhost:4000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Belajar Express"}'
```

## Design Decisions

- **SQLite** dipilih agar zero-setup — penilai tidak perlu memasang database server, cukup jalankan migration. Karena memakai Sequelize sebagai abstraksi, pindah ke Postgres/MySQL nanti cukup mengubah `config` tanpa menyentuh kode fitur.
- **Struktur modular per-fitur** (`modules/todo/`) alih-alih memisah global `models/`, `controllers/`, `routes/`. Semua yang berkaitan dengan satu fitur berada di satu folder, memudahkan penambahan fitur baru.
- **Service layer terpisah** memisahkan logika bisnis dari lapisan HTTP, sehingga service bisa dipakai ulang dan mudah dites tanpa bergantung pada Express.
- **Error handling terpusat** lewat satu middleware. Express 5 otomatis meneruskan error dari fungsi async, jadi controller tetap bersih tanpa `try/catch` berulang.
- **API client terpusat** di frontend (`lib/api.ts`) — komponen tidak berurusan langsung dengan `fetch`/URL, konsisten dengan semangat service layer di backend.

## Possible Improvements

- Validasi input yang lebih kuat (mis. Zod / express-validator) dan pesan error terstruktur.
- Pagination & filter (mis. tampilkan hanya yang belum selesai) pada `GET /todos`.
- Automated test (unit test untuk service, integration test untuk endpoint).
- Optimistic UI update agar terasa lebih instan sebelum respons server tiba.
- Autentikasi user sehingga tiap orang punya daftar todo sendiri.
- Deploy (backend + database managed, frontend ke Vercel).
# todo-tracker
# todo-tracker
