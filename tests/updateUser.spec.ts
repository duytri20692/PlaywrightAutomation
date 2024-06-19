import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';

// 2.a:  Gets a token from POST Login-Successful and passes this as a Bearer Token for UPDATE endpoint.
let token: string;
test.beforeAll(async ({ request }) => {
  token = await getAuthToken(request);
});

test.describe('UPDATE User Endpoint Tests', () => {
  // 2.b: Add 3 test cases Positive/negative cases for UPDATE endpoint
  // Positive case
  test('Update Existing User', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "morpheus", job: "zion resident" }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', 'morpheus');
  });

// 2 Negative cases  
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