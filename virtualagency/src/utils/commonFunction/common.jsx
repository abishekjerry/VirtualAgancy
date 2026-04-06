import { labelRoutes } from "../../navigations/labelRoutes";
import { Labels } from "../constants/labels";
import * as XLSX from "xlsx";

export const validateName = (name) => {
  if (!name) return "Name is required";
  return "";
};

export const checkPasswordStrength = (password) => {
  return {
    hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    hasNumber: /(?=.*\d)/.test(password),
    hasSpecialChar: /(?=.*[!@#$%^&*])/.test(password),
    hasMinLength: password.length >= 8,
  };
};
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
export const isValidMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile.trim());
};

//return error message
export const emailValidation = (email) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (valid) {
    return "";
  } else {
    return "Enter a valid email";
  }
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (!/[a-z]/.test(password))
    return "Password must include a lowercase letter";
  if (!/[A-Z]/.test(password))
    return "Password must include an uppercase letter";
  if (!/\d/.test(password)) return "Password must include a digit";
  if (!/[!@#$%^&*]/.test(password))
    return "Password must include a special character";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};
export const validNumber = (mobile) => {
  const isValid = /^[6-9]/.test(mobile.trim());
  return isValid ? "" : "Enter a valid number";
};
export const allowOnlyNumbers = (value) => {
  return value.replace(/\D/g, "").slice(0, 10);
};

export function allowOnlyAlphabets(value = "") {
  return value
    .replace(/[^A-Za-z ]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const getfield = (fieldName) => {
  // Your logic here
  return fieldName;
};

export const isSuccess = (a) => a?.status === Labels.flag.status;

export function getErrorKey(name = "") {
  return name.replace(/^(txt_|dd_|ddl_|cb_)/, "");
}

export const isValidWebsite = (url) => {
  const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\/.*)?$/i;
  return pattern.test(url);
};

//to prevent values using onkeypress

export const allowAlphaSpace = (e) => {
  const regex = /^[A-Za-z\s]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault();
  }
};

export const allowEmailCharsOnly = (e) => {
  const allowedChars = /^[a-zA-Z0-9@._-]+$/;
  if (!allowedChars.test(e.key)) {
    e.preventDefault();
  }
};


export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};
export const parseDate = (dateStr) => {
  const p = dateStr.split(/[\/-]/);
  return p[0].length === 4 ? new Date(p[0], p[1] - 1, p[2]) : new Date(p[2], p[1] - 1, p[0]);
};

export function isNotEmpty(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0)
    return false;
  return true;
}

export const getEnquirySteps = (getLabel) => [
  { text: getLabel("lbl20"), url: labelRoutes.clientInfo },
  { text: getLabel("lbl21"), url: labelRoutes.enquiryDetails },
  { text: getLabel("lbl22"), url: labelRoutes.lineItems },
  { text: getLabel("lbl23"), url: labelRoutes.suppliers },
  { text: getLabel("lbl24"), url: "/clientInfo" }
];

export const API_HEADERS = {
  "PMG-Secret-KEY": "dslgjhfg087DFFh50821571gi",
  "PMG-Account": "Nestle",
  "PMG-API-KEY": "sdjfhgdf9847348dfdHJKD97888JDU99"
};

let handler;
export const setToast = (fn) => {
  handler = fn;
};
export const toast = (status, message) => {
  handler?.({ status, message });
};

/**
 * Export JSON data to Excel
 * @param {Array} data - Array of objects to export
 * @param {String} fileName - Name of the Excel file (without extension)
 */
export const exportToExcel = (data, fileName = Labels.reportName.report) => {
  if (!data || data.length === 0) return;

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Auto column widths
  const columnWidths = Object.keys(data[0]).map((key) => ({
    wch: Math.max(
      key.length,
      ...data.map((row) => (row[key] ? row[key].toString().length : 10))
    ),
  }));
  worksheet["!cols"] = columnWidths;

  XLSX.utils.sheet_add_json(worksheet, [], { skipHeader: true });
  worksheet["!autofilter"] = { ref: worksheet["!ref"] };

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write Excel file
  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${fileName}_${today}.xlsx`);
};
