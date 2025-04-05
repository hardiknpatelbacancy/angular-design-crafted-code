// src/services/sessionStorageService.ts

export const STORAGE_KEY = "excelData";

export const sessionStorageService = {
  setExcelData: (data, key) => {
    try {
      const jsonData = JSON.stringify(data);
      sessionStorage.setItem(key, jsonData);
    } catch (err) {
      console.error("Error setting Excel data in sessionStorage:", err);
    }
  },

  getExcelData: (key) => {
    try {
      const jsonData = sessionStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (err) {
      console.error("Error getting Excel data from sessionStorage:", err);
      return null;
    }
  },

  clearExcelData: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Error clearing Excel data from sessionStorage:", err);
    }
  },
};
