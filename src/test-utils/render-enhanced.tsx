import React from 'react';
import type { ReactElement } from 'react';
import { ContextProvider } from '@/context';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { MemoryRouterProps } from 'react-router';
import userEvent from '@testing-library/user-event';

/**
 * Test-friendly context providers that don't make fetch calls
 * This prevents React act() warnings in tests
 */
export const TestContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock the providers to avoid fetch calls
  return (
    <div data-testid="test-context-provider">
      {children}
    </div>
  );
};

/**
 * Enhanced render helper that prevents React act() warnings
 * by avoiding fetch calls in context providers during tests
 */
export interface RenderWithProvidersOptions {
  /** Initial route path. */
  route?: string;
  /** Extra props for MemoryRouter (except children). */
  routerProps?: Omit<MemoryRouterProps, 'children' | 'initialEntries'>;
  /** Whether to include the full app ContextProvider tree (default: true). */
  withProviders?: boolean;
  /** Whether to use test-friendly providers that don't fetch (default: true). */
  useTestProviders?: boolean;
}

export const renderWithProviders = (
  ui: ReactElement,
  { 
    route = '/', 
    routerProps = {}, 
    withProviders = true, 
    useTestProviders = true 
  }: RenderWithProvidersOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let content = children;
    
    if (withProviders) {
      if (useTestProviders) {
        // Use test-friendly provider that doesn't fetch
        content = <TestContextProvider>{children}</TestContextProvider>;
      } else {
        // Use real providers (may cause act warnings)
        content = <ContextProvider>{children}</ContextProvider>;
      }
    }
    
    return (
      <MemoryRouter initialEntries={[route]} {...routerProps}>
        {content}
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();
  const utils = render(ui, { wrapper: Wrapper });
  return { user, ...utils };
};

/** Convenience alias matching common test naming preferences */
export const setup = renderWithProviders;
