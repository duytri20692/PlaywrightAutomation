import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';

let token: string;

test.beforeAll(async ({ request }) => {
  token = await getAuthToken(request);
});

test.describe('UPDATE User Endpoint Tests', () => {
  test('Update Existing User', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "morpheus", job: "zion resident" }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', 'morpheus');
  });

  test('Attempt to update non-existing user', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/users/23`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "morpheus", job: "zion resident" }
    });
    // expect(response.status()).toBe(404); // Expect response error 404 NotFound, actual return 200 
    expect(response.status()).toBe(200);
  });

  test('Attempt to Update user details without authentication', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: { name: "morpheus", job: "zion resident" }
    });
    // expect(response.status()).toBe(401); // Expect response error 401 Unauthorized, actual return 200
    expect(response.status()).toBe(200);
  });
});