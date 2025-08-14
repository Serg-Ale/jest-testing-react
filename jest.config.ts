/* Jest configuration tuned for TypeScript + React (ESM) */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.test.json' }]
  },
  moduleNameMapper: {
    // CSS & style modules
    '^.+\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    // Static assets (images / media)
    '^.+\\.(svg|png|jpg|jpeg|gif|bmp|webp)$': '<rootDir>/test/__mocks__/fileMock.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}