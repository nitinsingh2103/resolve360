/**
 * AICTE Resolve360 - API Client Layer
 *
 * Configured with VITE_API_BASE_URL for seamless transition to Python FastAPI backend.
 * In this hackathon prototype stage, requests fall back to localStorage-backed service
 * simulation when VITE_API_BASE_URL is not set or FastAPI server is offline.
 *
 * Future planned FastAPI endpoints:
 * - GET    /api/complaints              -> List and filter complaints
 * - POST   /api/complaints              -> Create complaint
 * - GET    /api/complaints/{id}         -> Retrieve detailed complaint
 * - PATCH  /api/complaints/{id}         -> Update status, bureau, priority, notes
 * - POST   /api/complaints/{id}/comments -> Append audit comment
 * - GET    /api/bureaus                 -> List bureau statistics
 * - GET    /api/analytics/overview      -> KPI metrics and charts
 * - GET    /api/escalations             -> Escalated and overdue cases
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

export const isFastApiConnected = () => {
  return Boolean(API_BASE_URL);
};

export const getApiBaseUrl = () => API_BASE_URL;

export async function request(endpoint, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('FASTAPI_NOT_CONNECTED: Running in local mock/localStorage mode');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Request failed with status ${response.status}`);
  }
  return response.json();
}
