import { PlaywrightTestConfig } from '@playwright/test';
import CustomReporter from './utils/reporter';
import { config } from './utils/config';

const testConfig: PlaywrightTestConfig = {
  projects: [
    {
      name: 'test',
      use: {
        baseURL: config.test.baseURL,
      },
    },
    {
      name: 'stage',
      use: {
        baseURL: config.stage.baseURL,
      },
    }
  ],
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['./utils/reporter.ts', { class: CustomReporter }]
  ],
};

export default testConfig;