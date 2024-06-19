import { test, expect } from '@playwright/test';
import { getEnvConfig } from '../utils/envConfig';

// 2. c: Add 2 End2End/Workflow test 
test.describe('End-to-End Workflow Tests', () => {
  test('Successfully log in, retrieve user details, update the user, and then delete the user', async ({ request, baseURL }) => {
    // 3.a: Test for Successful login (OK)
    const envConfig = getEnvConfig();

    const loginResponse = await request.post(`${baseURL}/login`, {
      data: {
        email: envConfig.credentials.valid.email,
        password: envConfig.credentials.valid.password
      }
    });
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody).toHaveProperty('token');

    // 3.b: Organise for the login test to be run against the successful Login endpoint 
    // Retrieve the user's details
    const userId = 2;
    const userResponse = await request.get(`${baseURL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${loginResponseBody.token}` }
    });
    expect(userResponse.status()).toBe(200);
    const userResponseBody = await userResponse.json();
    expect(userResponseBody.data).toHaveProperty('id', userId);

    // Update user details
    const updateUserResponse = await request.put(`${baseURL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${loginResponseBody.token}` },
      data: { name: "morpheus", job: "zion resident" }
    });
    expect(updateUserResponse.status()).toBe(200);
    const updateUserResponseBody = await updateUserResponse.json();
    expect(updateUserResponseBody).toHaveProperty('name', 'morpheus');
    expect(updateUserResponseBody).toHaveProperty('job', 'zion resident');

    // Delete user
    const deleteUserResponse = await request.delete(`${baseURL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${loginResponseBody.token}` }
    });
    expect(deleteUserResponse.status()).toBe(204);
  });

  test('Fail to log in, attempt to retrieve user details (should fail), and handle unauthorized responses', async ({ request, baseURL }) => {
    const envConfig = getEnvConfig();

    // 3.a: Test for Unsuccessful login (BadRequest)
    const loginResponse = await request.post(`${baseURL}/login`, {
      data: {
        email: envConfig.credentials.invalid.email
      }
    });
    expect(loginResponse.status()).toBe(400);
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody).toHaveProperty('error', 'Missing password');

    // 3.b: Organise for the login test to be run against the unsuccessful Login endpoint 
    // Attempt to retrieve user details without authorization
    const userId = 2;
    const userResponse = await request.get(`${baseURL}/users/${userId}`);
    expect(userResponse.status()).toBe(401); // Expect response error 401 Unauthorized, actual return 200
  });
});