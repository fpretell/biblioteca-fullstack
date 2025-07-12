// src/config/api.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  version: API_VERSION,
};
