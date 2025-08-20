import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for libraries expecting them in JSDOM (Node 18+ may still require explicit import)
import { TextEncoder, TextDecoder } from 'util';

interface GlobalPolyfill {
	TextEncoder?: typeof TextEncoder;
	TextDecoder?: typeof TextDecoder;
}
const g = globalThis as GlobalPolyfill;
if (!g.TextEncoder) g.TextEncoder = TextEncoder;
if (!g.TextDecoder) g.TextDecoder = TextDecoder;

// Mock react-router hooks used in tests (react-router v7)
import { mockNavigate } from './src/test-utils/routerMocks';
jest.mock('react-router', () => {
	const actual = jest.requireActual('react-router');
	return {
		...actual,
		useNavigate: () => mockNavigate
	};
});

// Install shared fetch mock (can be customized per test by overriding global.fetch)
import { installGlobalFetchMock, resetMockFetch } from './src/test-utils/mockFetch';
installGlobalFetchMock();

// Speed up setTimeout for testing (reduce 2000ms to 100ms)
const originalSetTimeout = global.setTimeout;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.setTimeout = ((callback: (...args: any[]) => void, delay?: number, ...args: any[]) => {
  // If delay is 2000ms (checkout delay), reduce it to 100ms for tests
  const testDelay = delay === 2000 ? 100 : delay;
  return originalSetTimeout(callback, testDelay, ...args);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// Optionally clear fetch mock call history after each test
afterEach(() => {
	resetMockFetch();
	mockNavigate.mockClear();
});
