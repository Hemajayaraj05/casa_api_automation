import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'content-type': 'application/json'
    }
  }
});