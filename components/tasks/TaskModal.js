"use client";

import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input, Textarea, Select } from "../ui/Input";
import { Button } from "../ui/Button";

function TaskFormContent({ initialData, subjects, onSubmit, onClose }) {
  const [formData, setFormData] = useState(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    subjectId: initialData?.subjectId || (subjects[0]?.id || ""),
    dueDate: initialData?.dueDate || new Date().toISOString().split("T")[0],
    priority: initialData?.priority || "Medium",
    status: initialData?.status || "To Do",
  }));

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Judul tugas tidak boleh kosong.";
    }
    if (!formData.subjectId) {
      newErrors.subjectId = "Pilih mata kuliah untuk tugas ini.";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Tentukan batas waktu (deadline).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <Input
        label="Judul Tugas *"
        placeholder="Contoh: Implementasi API Next.js & Database"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Mata Kuliah *"
          value={formData.subjectId}
          onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
          error={errors.subjectId}
        >
          <option value="" disabled>
            Pilih Mata Kuliah
          </option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name} ({sub.code})
            </option>
          ))}
        </Select>

        <Input
          type="date"
          label="Batas Waktu (Deadline) *"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          error={errors.dueDate}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Tingkat Prioritas"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Rendah (Low)</option>
          <option value="Medium">Sedang (Medium)</option>
          <option value="High">Tinggi (High Urgent)</option>
        </Select>

        <Select
          label="Status Pengerjaan"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="To Do">Belum Dimulai (To Do)</option>
          <option value="In Progress">Sedang Dikerjakan (In Progress)</option>
          <option value="Completed">Selesai (Completed)</option>
        </Select>
      </div>

      <Textarea
        label="Deskripsi / Catatan Tambahan (Opsional)"
        placeholder="Tambahkan detail kriteria penilaian, link materi, atau instruksi dosen..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
        <Button type="button" variant="ghost" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit">
          {initialData ? "Simpan Perubahan" : "Tambahkan Tugas"}
        </Button>
      </div>
    </form>
  );
}

export function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  subjects = [],
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Tugas Kuliah" : "Tambah Tugas Kuliah Baru"}
      description="Pastikan semua detail tugas terisi dengan benar untuk mempermudah pelacakan deadline."
    >
      {isOpen && (
        <TaskFormContent
          key={initialData?.id || "new-task-modal"}
          initialData={initialData}
          subjects={subjects}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
