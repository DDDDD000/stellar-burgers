/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};

export default config;
