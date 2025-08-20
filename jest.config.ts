/* Jest configuration tuned for TypeScript + React (ESM) */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { 
      useESM: true, 
      tsconfig: 'tsconfig.test.json'
    }]
  },
  moduleNameMapper: {
    '^.+\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  '^.+\\.(svg|png|jpg|jpeg|gif|bmp|webp)$': '<rootDir>/src/test-utils/fileMock.ts',
  '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Performance optimizations
  maxWorkers: '50%',
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test-utils/**',
    '!src/**/__tests__/**'
  ]
}