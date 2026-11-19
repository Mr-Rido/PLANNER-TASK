"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import {
  getStoredTasks,
  saveStoredTasks,
  getStoredSubjects,
  saveStoredSubjects,
  getStoredProfile,
  saveStoredProfile,
  getStoredActivities,
  addStoredActivity,
  resetAllData,
  importBackupData,
} from "@/lib/storage";

// React 19 safe hydration detector using useSyncExternalStore
const emptySubscribe = () => () => {};
const useIsHydrated = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export function usePlanner() {
  const isHydrated = useIsHydrated();

  const [tasks, setTasks] = useState(() => getStoredTasks());
  const [subjects, setSubjects] = useState(() => getStoredSubjects());
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [activities, setActivities] = useState(() => getStoredActivities());

  useEffect(() => {
    const handleStorageChange = () => {
      setTasks(getStoredTasks());
      setSubjects(getStoredSubjects());
      setProfile(getStoredProfile());
      setActivities(getStoredActivities());
    };

    window.addEventListener("planner_storage_changed", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("planner_storage_changed", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Task Operations
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: "tsk-" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveStoredTasks(updated);
    addStoredActivity("Tambah", `Menambahkan tugas: "${newTask.title}"`, "plus");
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    setTasks(updated);
    saveStoredTasks(updated);
    const target = tasks.find((t) => t.id === id);
    addStoredActivity("Update", `Memperbarui tugas: "${target?.title || "Tugas"}"`, "edit");
  };

  const deleteTask = (id) => {
    const target = tasks.find((t) => t.id === id);
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveStoredTasks(updated);
    addStoredActivity("Hapus", `Menghapus tugas: "${target?.title || "Tugas"}"`, "trash");
  };

  const toggleTaskStatus = (id) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    let nextStatus = "To Do";
    if (target.status === "To Do") nextStatus = "In Progress";
    else if (target.status === "In Progress") nextStatus = "Completed";
    else if (target.status === "Completed") nextStatus = "To Do";

    const updated = tasks.map((t) => (t.id === id ? { ...t, status: nextStatus } : t));
    setTasks(updated);
    saveStoredTasks(updated);

    const actionText =
      nextStatus === "Completed"
        ? `Menandai selesai tugas: "${target.title}"`
        : `Mengubah status tugas "${target.title}" ke ${nextStatus}`;
    addStoredActivity("Status", actionText, nextStatus === "Completed" ? "check" : "edit");
  };

  // Subject Operations
  const addSubject = (subjectData) => {
    const newSubject = {
      ...subjectData,
      id: "sub-" + Date.now(),
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveStoredSubjects(updated);
    addStoredActivity("Tambah", `Menambahkan mata kuliah: "${newSubject.name}"`, "book");
    return newSubject;
  };

  const updateSubject = (id, updatedFields) => {
    const updated = subjects.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    setSubjects(updated);
    saveStoredSubjects(updated);
    const target = subjects.find((s) => s.id === id);
    addStoredActivity("Update", `Memperbarui mata kuliah: "${target?.name || "Mata Kuliah"}"`, "edit");
  };

  const deleteSubject = (id) => {
    const target = subjects.find((s) => s.id === id);
    const updatedSubjects = subjects.filter((s) => s.id !== id);
    const updatedTasks = tasks.map((t) => (t.subjectId === id ? { ...t, subjectId: "" } : t));

    setSubjects(updatedSubjects);
    saveStoredSubjects(updatedSubjects);
    setTasks(updatedTasks);
    saveStoredTasks(updatedTasks);

    addStoredActivity("Hapus", `Menghapus mata kuliah: "${target?.name || "Mata Kuliah"}"`, "trash");
  };

  // Profile Operations
  const updateProfile = (updatedFields) => {
    const updated = { ...profile, ...updatedFields };
    setProfile(updated);
    saveStoredProfile(updated);
    addStoredActivity("Profil", "Memperbarui data profil mahasiswa", "user");
  };

  // Reset to initial dummy
  const resetData = () => {
    resetAllData();
    setTasks(getStoredTasks());
    setSubjects(getStoredSubjects());
    setProfile(getStoredProfile());
    setActivities(getStoredActivities());
  };

  // Import backup data
  const importData = (jsonData) => {
    const result = importBackupData(jsonData);
    if (result.success) {
      setTasks(getStoredTasks());
      setSubjects(getStoredSubjects());
      setProfile(getStoredProfile());
      setActivities(getStoredActivities());
    }
    return result;
  };

  return {
    tasks,
    subjects,
    profile,
    activities,
    isLoaded: isHydrated,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    addSubject,
    updateSubject,
    deleteSubject,
    updateProfile,
    resetData,
    importData,
  };
}
