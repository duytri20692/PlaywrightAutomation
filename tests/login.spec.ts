import { test, expect } from '@playwright/test';
import { getEnvConfig } from '../utils/envConfig';

test.describe('Login Endpoint Tests', () => {
// 2.b: Add 3 test cases (Positive/negative cases) for POST endpoint  
// Positive case
  test('Successful login', async ({ request, baseURL }) => {
    const envConfig = getEnvConfig();
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: envConfig.credentials.valid.email,
        password: envConfig.credentials.valid.password
      }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

// 2 negative cases  
  test('Unsuccessful login with invalid credentials', async ({ request, baseURL }) => {
    const envConfig = getEnvConfig();
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: envConfig.credentials.invalid
      }
    });
    expect(response.status()).toBe(400); 
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
  });

  test('Unsuccessful login with missing fields', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'eve.holt@reqres.in'
        // No password provided
      }
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
  });
});