import { config } from './config';
import { test } from '@playwright/test';

export function getEnvConfig() {
  const projectName = test.info().project.name;
  return config[projectName];
}