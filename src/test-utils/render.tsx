import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactElement } from 'react';
import type { MemoryRouterProps } from 'react-router';
import userEvent from '@testing-library/user-event';
import { ContextProvider } from '@/context';

/**
 * Unified render helper for component and screen tests.
 * - Wraps UI with MemoryRouter (configurable initial route)
 * - Optionally injects global app providers (ContextProvider)
 * - Returns already configured userEvent instance to avoid per-test boilerplate.
 */
export interface RenderWithProvidersOptions {
  /** Initial route path. */
  route?: string;
  /** Extra props for MemoryRouter (except children). */
  routerProps?: Omit<MemoryRouterProps, 'children' | 'initialEntries'>;
  /** Whether to include the full app ContextProvider tree (default: true). */
  withProviders?: boolean;
}

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', routerProps = {}, withProviders = true }: RenderWithProvidersOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const content = withProviders ? <ContextProvider>{children}</ContextProvider> : children;
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
