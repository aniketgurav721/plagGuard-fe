import axios from "axios";

/**
 * Shared Axios client for API requests.
 * Uses REACT_APP_API_URL in production; falls back to CRA dev proxy when unset.
 */
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
