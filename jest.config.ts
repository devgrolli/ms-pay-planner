import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/mid/(.*)$': '<rootDir>/src/middleware/$1',
    '^@/dto/(.*)$': '<rootDir>/src/dto/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@/useCase/(.*)$': '<rootDir>/src/useCases/$1',
    '^@/consts/(.*)$': '<rootDir>/src/constants/$1',
    '^@/controller/(.*)$': '<rootDir>/src/controllers/$1'
  }
};

export default config;
