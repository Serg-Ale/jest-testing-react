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
jest.mock('react-router', () => {
	const actual = jest.requireActual('react-router');
	return {
		...actual,
		useNavigate: () => jest.fn()
	};
});
