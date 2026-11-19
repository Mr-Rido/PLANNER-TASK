export const initialSubjects = [
  {
    id: "sub-1",
    name: "Pemrograman Web 1",
    code: "IF3201",
    color: "#8b5cf6", 
    lecturer: "Rimasya Ayu Jaeningsih S.kom., M.kom.",
    room: "Lab Rekayasa Perangkat Lunak",
  },
  {
    id: "sub-2",
    name: "Struktur Data & Algoritma",
    code: "IF2102",
    color: "#38bdf8", 
    lecturer: "Prof. Rina Kusuma, Ph.D",
    room: "Gedung Kuliah Bersama 302",
  },
  {
    id: "sub-3",
    name: "Basis Data & Cloud",
    code: "IF2204",
    color: "#10b981", 
    lecturer: "Ir. Budi Santoso, M.Sc",
    room: "Lab Basis Data",
  },
  {
    id: "sub-4",
    name: "Kecerdasan Buatan (AI)",
    code: "IF3105",
    color: "#f43f5e", 
    lecturer: "Dr. Maya Safitri, S.T., M.T.",
    room: "Ruang Teori 405",
  },
  {
    id: "sub-5",
    name: "Interaksi Manusia & Komputer",
    code: "IF3302",
    color: "#f59e0b", 
    lecturer: "Sari Ramadhani, M.Ds",
    room: "Multimedia Studio",
  },
];

// Helper to get formatted dates relative to today
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
};

export const initialTasks = [
  {
    id: "tsk-1",
    title: "Implementasi REST API & Next.js App Router",
    description: "Membuat endpoint backend dan mengintegrasikan dengan frontend Next.js untuk tugas besar semester.",
    subjectId: "sub-1",
    dueDate: getRelativeDate(2),
    priority: "High",
    status: "In Progress",
    createdAt: getRelativeDate(-4),
  },
  {
    id: "tsk-2",
    title: "Analisis Kompleksitas Algoritma Dijkstra & A*",
    description: "Menulis laporan analisis Big-O notation dan perbandingan efisiensi shortest path algorithm.",
    subjectId: "sub-2",
    dueDate: getRelativeDate(1),
    priority: "High",
    status: "To Do",
    createdAt: getRelativeDate(-3),
  },
  {
    id: "tsk-3",
    title: "Desain Skema Database Relasional E-Commerce",
    description: "Normalisasi bentuk 1NF, 2NF, dan 3NF beserta query optimasi indexing PostgreSQL.",
    subjectId: "sub-3",
    dueDate: getRelativeDate(5),
    priority: "Medium",
    status: "To Do",
    createdAt: getRelativeDate(-2),
  },
  {
    id: "tsk-4",
    title: "Prototyping High-Fidelity Mobile UI di Figma",
    description: "Membuat desain antarmuka student planner dengan prinsip Heuristic Evaluation Nielsen.",
    subjectId: "sub-5",
    dueDate: getRelativeDate(-1), // Kemarin (Overdue simulation or ready to mark completed)
    priority: "Medium",
    status: "Completed",
    createdAt: getRelativeDate(-6),
  },
  {
    id: "tsk-5",
    title: "Eksperimen Model Klasifikasi Citra CNN",
    description: "Melakukan fine-tuning model ResNet-50 pada dataset penyakit tanaman dengan PyTorch.",
    subjectId: "sub-4",
    dueDate: getRelativeDate(4),
    priority: "Low",
    status: "In Progress",
    createdAt: getRelativeDate(-1),
  },
  {
    id: "tsk-6",
    title: "Kuis Online Query Window Functions SQL",
    description: "Persiapan kuis materi ROW_NUMBER, RANK, DENSE_RANK, dan PARTITION BY.",
    subjectId: "sub-3",
    dueDate: getRelativeDate(7),
    priority: "Low",
    status: "To Do",
    createdAt: getRelativeDate(0),
  },
];

export const initialProfile = {
  name: "Ridhwan Rido",
  studentId: "241091700429",
  major: "Sistem Informasi",
  university: "Universitas Pamulang",
  semester: "Semester 5",
  gpa: "3.84",
  email: "iwan@ui.ac.id",
};

export const initialActivities = [
  {
    id: "act-1",
    action: "Selesai",
    text: "Menyelesaikan tugas Prototyping High-Fidelity Mobile UI di Figma",
    timestamp: "2 jam yang lalu",
    icon: "check",
  },
  {
    id: "act-2",
    action: "Update",
    text: "Mengubah status tugas Implementasi REST API ke 'In Progress'",
    timestamp: "5 jam yang lalu",
    icon: "edit",
  },
  {
    id: "act-3",
    action: "Tambah",
    text: "Menambahkan tugas baru: Kuis Online Query Window Functions SQL",
    timestamp: "1 hari yang lalu",
    icon: "plus",
  },
];
