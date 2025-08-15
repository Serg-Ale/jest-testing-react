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

// Optionally clear fetch mock call history after each test
afterEach(() => {
	resetMockFetch();
	mockNavigate.mockClear();
});
