// Shared mockFetch utility for tests
// Provides deterministic responses for specific endpoints and a fallback empty object.

export interface MockFetchConfig {
  categories?: unknown;
  products?: unknown;
  fallback?: unknown;
}

// Factory allows customization per test if needed
export const createMockFetch = (config: MockFetchConfig = {}): jest.Mock => {
  const {
    categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' }
    ],
    products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ],
    fallback = {}
  } = config;

  const fn = jest.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();

    const respond = (data: unknown, init: Partial<Response> = {}) => ({
      ok: true,
      status: init.status ?? 200,
      json: async () => data
    });

    if (url.endsWith('/categories') || url === '/categories') {
      return respond(categories);
    }
    if (url.endsWith('/products') || url === '/products') {
      return respond(products);
    }
    return respond(fallback);
  });
  return fn;
};

// Default singleton used in most tests (can be overridden locally if needed)
export const mockFetch = createMockFetch();

// Helper to install on globalThis.fetch inside jest.setup.ts or individual tests
export const installGlobalFetchMock = (): void => {
  // Minimal interface for assignment while preserving mock capabilities
  interface FetchHolder { fetch: typeof globalThis.fetch; }
  (globalThis as unknown as FetchHolder).fetch = mockFetch as unknown as typeof globalThis.fetch;
};

// Optional helper to reset call history between tests
export const resetMockFetch = (): void => {
  mockFetch.mockClear();
};

// Pattern for per-test customization (example):
// const localMock = createMockFetch({ products: [{ id: 99, name: 'X' }] });
// global.fetch = localMock;
