import { initialTasks, initialSubjects, initialProfile, initialActivities } from "@/data/dummyData";

const TASKS_KEY = "planner_tasks_v1";
const SUBJECTS_KEY = "planner_subjects_v1";
const PROFILE_KEY = "planner_profile_v1";
const ACTIVITIES_KEY = "planner_activities_v1";

const notifyChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("planner_storage_changed"));
  }
};

// Safe JSON parser with fallback
const safeParse = (data, fallback) => {
  if (!data) return fallback;
  try {
    const parsed = JSON.parse(data);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (err) {
    console.warn("Data corrupt di LocalStorage, mengembalikan default:", err);
    return fallback;
  }
};

export const getStoredTasks = () => {
  if (typeof window === "undefined") return initialTasks;
  try {
    const data = localStorage.getItem(TASKS_KEY);
    if (!data) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(initialTasks));
      return initialTasks;
    }
    const parsed = safeParse(data, initialTasks);
    return Array.isArray(parsed) ? parsed : initialTasks;
  } catch (err) {
    console.error("Gagal membaca tasks dari localStorage:", err);
    return initialTasks;
  }
};

export const saveStoredTasks = (tasks) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(Array.isArray(tasks) ? tasks : []));
    notifyChange();
  } catch (err) {
    console.error("Gagal menyimpan tasks ke localStorage:", err);
  }
};

export const getStoredSubjects = () => {
  if (typeof window === "undefined") return initialSubjects;
  try {
    const data = localStorage.getItem(SUBJECTS_KEY);
    if (!data) {
      localStorage.setItem(SUBJECTS_KEY, JSON.stringify(initialSubjects));
      return initialSubjects;
    }
    const parsed = safeParse(data, initialSubjects);
    return Array.isArray(parsed) ? parsed : initialSubjects;
  } catch (err) {
    console.error("Gagal membaca subjects dari localStorage:", err);
    return initialSubjects;
  }
};

export const saveStoredSubjects = (subjects) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(Array.isArray(subjects) ? subjects : []));
    notifyChange();
  } catch (err) {
    console.error("Gagal menyimpan subjects ke localStorage:", err);
  }
};

export const getStoredProfile = () => {
  if (typeof window === "undefined") return initialProfile;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(initialProfile));
      return initialProfile;
    }
    return safeParse(data, initialProfile);
  } catch (err) {
    console.error("Gagal membaca profile dari localStorage:", err);
    return initialProfile;
  }
};

export const saveStoredProfile = (profile) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile || initialProfile));
    notifyChange();
  } catch (err) {
    console.error("Gagal menyimpan profile ke localStorage:", err);
  }
};

export const getStoredActivities = () => {
  if (typeof window === "undefined") return initialActivities;
  try {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    if (!data) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initialActivities));
      return initialActivities;
    }
    const parsed = safeParse(data, initialActivities);
    return Array.isArray(parsed) ? parsed : initialActivities;
  } catch (err) {
    console.error("Gagal membaca activities dari localStorage:", err);
    return initialActivities;
  }
};

export const addStoredActivity = (action, text, icon = "info") => {
  if (typeof window === "undefined") return;
  try {
    const activities = getStoredActivities();
    const newActivity = {
      id: "act-" + Date.now(),
      action,
      text,
      timestamp: "Baru saja",
      icon,
    };
    const updated = [newActivity, ...activities.slice(0, 19)];
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
    notifyChange();
  } catch (err) {
    console.error("Gagal menambah activity ke localStorage:", err);
  }
};

export const resetAllData = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(initialTasks));
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(initialSubjects));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(initialProfile));
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initialActivities));
    notifyChange();
  } catch (err) {
    console.error("Gagal mereset data:", err);
  }
};

export const importBackupData = (backupJson) => {
  if (typeof window === "undefined") return { success: false, error: "Window undefined" };
  try {
    const data = typeof backupJson === "string" ? JSON.parse(backupJson) : backupJson;

    if (!data || typeof data !== "object") {
      throw new Error("Format berkas backup tidak valid.");
    }

    if (Array.isArray(data.tasks)) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(data.tasks));
    }
    if (Array.isArray(data.subjects)) {
      localStorage.setItem(SUBJECTS_KEY, JSON.stringify(data.subjects));
    }
    if (data.profile && typeof data.profile === "object") {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data.profile));
    }

    addStoredActivity("Restore", "Memulihkan data dari berkas backup JSON", "database");
    notifyChange();
    return { success: true };
  } catch (err) {
    console.error("Gagal mengimpor data:", err);
    return { success: false, error: err.message };
  }
};
