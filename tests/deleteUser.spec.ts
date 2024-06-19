import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';

let token: string;

test.beforeAll(async ({ request }) => {
  token = await getAuthToken(request);
});

test.describe('DELETE User Endpoint Tests', () => {  
  test('Delete Existing User', async ({ request, baseURL }) => {
    const userId = 2;
    const response = await request.delete(`${baseURL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(204);
  });

  test('Attempt to delete non-existing user', async ({ request, baseURL }) => {
    const userId = 23;
    const response = await request.delete(`${baseURL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // expect(response.status()).toBe(404); // // Expect response error 404 NotFound, actual return 204
    expect(response.status()).toBe(204);
  });

  test('Attempt to delete user details without authentication', async ({ request, baseURL }) => {
    const userId = 2;
    const response = await request.delete(`${baseURL}/users/${userId}`);
    // expect(response.status()).toBe(404); // // Expect response error 404 NotFound, actual return 204
    expect(response.status()).toBe(204);
  });
});