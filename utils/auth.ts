import { APIRequestContext } from '@playwright/test';
import { getEnvConfig } from './envConfig';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const envConfig = getEnvConfig();
  const response = await request.post(`${envConfig.baseURL}/login`, {
    data: envConfig.credentials.valid
  });
  if (response.status() !== 200) {
    throw new Error('Failed to authenticate');
  }
  const responseBody = await response.json();
  return responseBody.token;
}