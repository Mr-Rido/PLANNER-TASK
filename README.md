# 🚀 Student Task Planner

> **Creative Futuristic — Dark Productivity Interface**  
> Web application modern untuk membantu mahasiswa mengelola tugas perkuliahan, memantau batas deadline, mengorganisasi mata kuliah, dan menganalisis produktivitas akademik.

---

## 🌟 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, JavaScript ES6+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Persistence**: Browser `LocalStorage` dengan proteksi SSR Hydration & Cross-tab Sync
- **Package Manager**: npm

---

## ✨ Fitur Utama

### 1. 📊 Dashboard
- Greeting cerdas berdasarkan waktu (*Selamat Pagi, Siang, Sore, Malam*).
- 4 Kartu Metrik: Total Tugas, Tugas Selesai, Dalam Pengerjaan, Terlambat (*Overdue*).
- Indikator target penyelesaian tugas (% keseluruhan).
- Daftar deadline terdekat dengan tombol cepat ubah status (*Quick Status Toggle*).
- Ringkasan distribusi mata kuliah dan tips manajemen waktu mahasiswa (*Pomodoro*).

### 2. 📝 Task Management (CRUD)
- Tambah, lihat detail, edit, dan hapus tugas dengan modal animasi.
- Atribut lengkap: Judul, Deskripsi, Mata Kuliah, Tanggal Deadline, Prioritas (*High, Medium, Low*), Status (*To Do, In Progress, Completed*).
- **Search & Filter**:
  - Pencarian real-time berdasarkan judul atau deskripsi.
  - Filter berdasarkan Mata Kuliah, Status, dan Tingkat Prioritas.
  - Pengurutan berdasarkan deadline terdekat, deadline terjauh, prioritas tertinggi, atau tanggal dibuat.
- Tampilan fleksibel: **Grid Card View** & **Compact List View**.

### 3. 📅 Interactive Calendar
- Kalender bulanan penuh dengan navigasi bulan (*Bulan Lalu, Bulan Depan, Hari Ini*).
- Indikator deadline tugas pada setiap cell tanggal dengan warna identitas mata kuliah.
- Panel agenda harian saat tanggal tertentu diklik, dilengkapi tombol tambah tugas langsung untuk tanggal tersebut.

### 4. 📚 Subject Management (CRUD)
- Kelola mata kuliah semester aktif (Nama, Kode Matkul, Dosen Pengampu, Ruang Kelas).
- 8 Pilihan palet warna identitas futuristik.
- Penghitungan otomatis beban tugas aktif dan persentase kelulusan per mata kuliah.
- Tombol langsung untuk memfilter tugas dari mata kuliah terkait.

### 5. 📈 Progress & Academic Analytics
- SVG Circular Progress animasi cincin capaian tugas.
- Rasio kelulusan tugas berdasarkan prioritas urgensi (*High, Medium, Low*).
- Grafik batang tingkat ketuntasan seluruh mata kuliah.
- Metrik status beban akademik (*Selesai, In Progress, To Do, Overdue*).

### 6. ⚙️ Settings & Local Data Management
- Pengaturan profil mahasiswa (Nama, NIM, Jurusan, Universitas, Semester, Target IPK, Email).
- **Ekspor Data (JSON)**: Unduh seluruh data tugas dan mata kuliah sebagai file JSON untuk dicadangkan.
- **Impor Data (JSON)**: Pulihkan data backup JSON kapan saja.
- **Reset ke Data Dummy**: Mengembalikan data contoh awal kapan saja.
- **Hapus Bersih**: Mengosongkan LocalStorage browser dengan konfirmasi aman.

---

## 📁 Struktur Direktori

```text
plannertask/
├── app/
│   ├── layout.js              # Root Layout dengan AppShell & Dark theme
│   ├── globals.css            # Desain sistem & utilitas glassmorphism
│   ├── page.js                # Dashboard Utama
│   ├── tasks/page.js          # Manajemen Tugas (CRUD, Search & Filter)
│   ├── calendar/page.js       # Kalender Bulanan Interaktif & Agenda
│   ├── subjects/page.js       # Manajemen Mata Kuliah & Distribusi
│   ├── progress/page.js       # Analisis Produktivitas & Statistik
│   └── settings/page.js       # Pengaturan Profil, Backup & Restore JSON
├── components/
│   ├── layout/
│   │   ├── AppShell.js        # Layout shell responsif & hydration guard
│   │   ├── Sidebar.js         # Navigasi desktop dengan active state
│   │   ├── Header.js          # Header dinamis & popover notifikasi
│   │   └── BottomNav.js       # Navigasi bawah untuk layar mobile
│   ├── ui/
│   │   ├── Button.js          # Button dengan Framer Motion micro-interactions
│   │   ├── Card.js            # Glassmorphism container dengan glow
│   │   ├── Badge.js           # PriorityBadge & StatusBadge
│   │   ├── Input.js           # Input, Textarea, Select futuristik
│   │   ├── Modal.js           # Dialog animasi dengan AnimatePresence
│   │   ├── ConfirmDialog.js   # Dialog konfirmasi aksi destruktif
│   │   └── Toast.js           # Notifikasi feedback otomatis
│   ├── dashboard/             # Komponen modular dashboard
│   ├── tasks/                 # Form modal tugas
│   └── subjects/              # Form modal mata kuliah
├── data/
│   └── dummyData.js           # Dataset demo realistis awal
├── hooks/
│   └── usePlanner.js          # Centralized State & CRUD Hook
└── lib/
    └── storage.js             # LocalStorage safe wrapper & JSON backup engine
```

---

## 🛠️ Menjalankan Proyek Secara Lokal

1. **Jalankan development server:**
   ```bash
   npm run dev
   ```

2. Buka browser di [http://localhost:3000](http://localhost:3000)

3. **Build untuk production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🎨 Konsep Desain: Creative Futuristic

- **Base Theme**: Charcoal-navy `#0b0f19` dengan ambient radial mesh background.
- **Accents**: Electric Purple `#8b5cf6`, Soft Cyan `#38bdf8`, Emerald `#10b981`, Rose `#f43f5e`, Amber `#f59e0b`.
- **Glassmorphism**: `backdrop-blur-md` dengan border semi-transparan `rgba(255, 255, 255, 0.08)`.
- **Typography & Interaction**: Micro-interactions dengan Framer Motion (*hover lift, tap feedback, fade and scale spring modals*).
