"use client";

import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const COLOR_PRESETS = [
  { label: "Electric Purple", value: "#8b5cf6" },
  { label: "Soft Cyan", value: "#38bdf8" },
  { label: "Emerald Green", value: "#10b981" },
  { label: "Rose Pink", value: "#f43f5e" },
  { label: "Amber Orange", value: "#f59e0b" },
  { label: "Indigo Blue", value: "#6366f1" },
  { label: "Teal Mint", value: "#14b8a6" },
  { label: "Fuchsia", value: "#d946ef" },
];

function SubjectFormContent({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    code: initialData?.code || "",
    color: initialData?.color || "#8b5cf6",
    lecturer: initialData?.lecturer || "",
    room: initialData?.room || "",
  }));

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Nama mata kuliah wajib diisi.";
    if (!formData.code.trim()) errs.code = "Kode mata kuliah wajib diisi.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Input
            label="Nama Mata Kuliah *"
            placeholder="Contoh: Pemrograman Berorientasi Objek"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />
        </div>
        <div>
          <Input
            label="Kode Matkul *"
            placeholder="CS101"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            error={errors.code}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Dosen Pengampu (Opsional)"
          placeholder="Dr. Budi Santoso, M.Kom"
          value={formData.lecturer}
          onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
        />
        <Input
          label="Ruangan / Kelas (Opsional)"
          placeholder="Lab Komputer 301 / Daring"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
        />
      </div>

      {/* Color Palette Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300">
          Warna Identitas Mata Kuliah
        </label>
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {COLOR_PRESETS.map((c) => {
            const isSelected = formData.color === c.value;
            return (
              <button
                type="button"
                key={c.value}
                onClick={() => setFormData({ ...formData, color: c.value })}
                className={`w-8 h-8 rounded-xl transition-all border-2 flex items-center justify-center ${
                  isSelected
                    ? "ring-2 ring-white scale-110 border-white shadow-lg"
                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button type="button" variant="ghost" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit">
          {initialData ? "Simpan Perubahan" : "Tambah Mata Kuliah"}
        </Button>
      </div>
    </form>
  );
}

export function SubjectModal({ isOpen, onClose, onSubmit, initialData = null }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah Baru"}
      description="Tambahkan mata kuliah untuk mengelompokkan tugas dan memantau beban akademik."
    >
      {isOpen && (
        <SubjectFormContent
          key={initialData?.id || "new-subject-modal"}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
