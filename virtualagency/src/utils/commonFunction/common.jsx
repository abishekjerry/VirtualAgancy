import { labelRoutes } from "../../navigations/labelRoutes";
import { Labels } from "../constants/labels";

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

//email hiding format
export const maskEmail = (email) => {
  if (!email || typeof email !== "string" || !email.includes("@")) return "-";
  const [user, domain] = email.split("@");
  if (!user || !domain) return "-";

  const maskedUser = user[0] + "*".repeat(user.length - 1);
  const domainParts = domain.split(".");
  const maskedDomain =
    domainParts[0][0] + "*".repeat(domainParts[0].length - 1);

  return `${maskedUser}@${maskedDomain}.${domainParts[1]}`;
};

//mobile hiding format
export const maskMobile = (number) => {
  if (!number || typeof number !== "string" || number.trim() === "") return "";
  const cleaned = number.trim();
  if (cleaned.length < 4) return "*".repeat(cleaned.length);
  return (
    cleaned.slice(0, 2) + "*".repeat(cleaned.length - 4) + cleaned.slice(-2)
  );
};
export const capsFormat = (value) => {
  const upperValue = value.toUpperCase();
  return upperValue;
};

export function validateEmailOrMobile(value) {
  const trimmedValue = value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!trimmedValue) {
    return "Required";
  }

  if (emailRegex.test(trimmedValue)) {
    return "";
  }

  if (mobileRegex.test(trimmedValue)) {
    return "";
  }

  return "Enter  valid email or mobile number";
}

export const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

export const toLowerCase = (event) => {
  event.target.value = event.target.value.toLowerCase();
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
  