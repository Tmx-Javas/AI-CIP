# CIP — Tim VortexCipher

Chat web app sederhana untuk tugas informatika. Tema hitam/putih/merah ala terminal security-ops.

## Struktur

```
ai-cip/
├── index.html       # UI chat (frontend, tanpa framework)
├── api/ask.js        # serverless function Vercel, proxy ke API AI
├── package.json
└── README.md
```

Frontend mengirim `POST /api/ask` dengan body `{ "question": "..." }`, lalu
`api/ask.js` yang meneruskan ke API eksternal dan mengembalikan `{ "answer": "..." }`.

## Deploy ke Vercel

1. Buat repo baru di GitHub, push folder ini ke sana:
   ```bash
   git init
   git add .
   git commit -m "init CIP"
   git branch -M main
   git remote add origin <url-repo-kamu>
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → import repo tadi.
3. Framework preset: pilih **Other** (tidak perlu build command, tidak perlu output directory).
4. Klik **Deploy**. Vercel otomatis mendeteksi `api/ask.js` sebagai serverless function.
5. Selesai — buka URL yang diberikan Vercel, chat langsung jalan.

Tidak ada environment variable yang perlu diisi karena endpoint API sudah hardcode di `api/ask.js`.

## Jalan di lokal (opsional)

```bash
npm install
npx vercel dev
```

Lalu buka `http://localhost:3000`.

## Catatan

- `api/ask.js` memanggil endpoint publik pihak ketiga (`api.azbry.com`). Endpoint ini **tidak resmi**
  dan bisa berhenti berfungsi atau berubah kapan saja — kalau itu terjadi, ganti saja isi array
  `APIS` di `api/ask.js` dengan endpoint lain yang kamu punya akses sah ke situ (API key Anthropic/
  OpenAI kamu sendiri misalnya), struktur fungsinya tetap sama.
- Nomor di sidebar ("Hubungi Tim") mengarah ke WhatsApp — ganti linknya di `index.html` kalau perlu.
- Belum ada riwayat chat tersimpan (refresh = chat hilang). Kalau tugasnya perlu riwayat tersimpan,
  bilang aja, tinggal tambah `localStorage`.
