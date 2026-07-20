import { labelRoutes } from "../../navigations/labelRoutes";
import { API_HEADERS } from "../commonFunction/common";


const handleUnauthorized = (isDashboard) => {
  localStorage.removeItem("token");
  localStorage.setItem("unAuthorized", "true"); 

  if (isDashboard) return;
  window.location.href = labelRoutes.dashboard;
};

export const PostApi = (url, data = "", isDashboard = false) => {
  const isFormData = data instanceof FormData;
  const token = localStorage.getItem("token");
  const headers = { ...API_HEADERS };

  if (isFormData) {
    delete headers["Content-Type"];
    delete headers["content-type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const targetUrl = url instanceof URL ? url.href : url.toString();

  return fetch(targetUrl, {
    method: "POST",
    credentials: "include",
    headers: headers,
    body: isFormData ? data : JSON.stringify(data || {}),
  })
    .then(async (response) => {
      if (response.status === 401) {
        handleUnauthorized(isDashboard);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return { status: "F", message: "Unexpected response format" };
      }
    })
    .catch((error) => {
      return {
        status: "F",
        message: error.message || "No response from server",
      };
    });
};

export const GetApi = (url, customHeaders = {}, isDashboard = false) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...API_HEADERS,
    ...customHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const targetUrl = url instanceof URL ? url.href : url.toString();

  return fetch(targetUrl, {
    method: "GET",
    credentials: "include", 
    headers: headers,
  })
    .then(async (response) => {
      if (response.status === 401) {
        handleUnauthorized(isDashboard);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const raw = await response.text();
      if (!raw || raw.trim() === "") return { status: "S", data: null };
      
      try {
        return { status: "S", data: JSON.parse(raw) };
      } catch (err) {
        return { status: "F", message: "Invalid JSON from server" };
      }
    })
    .catch((error) => {
      return {
        status: "F",
        message: error.message || "Network request failed",
      };
    });
};