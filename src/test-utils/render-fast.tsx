import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactElement } from 'react';
import type { MemoryRouterProps } from 'react-router';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/cart';

/**
 * Fast render helper that avoids network calls by only including essential providers.
 * Use this for tests that don't need full context (products/categories).
 */
export interface RenderFastOptions {
  /** Initial route path. */
  route?: string;
  /** Extra props for MemoryRouter (except children). */
  routerProps?: Omit<MemoryRouterProps, 'children' | 'initialEntries'>;
}

export const renderFast = (
  ui: ReactElement,
  { route = '/', routerProps = {} }: RenderFastOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <MemoryRouter initialEntries={[route]} {...routerProps}>
        <CartProvider>
          {children}
        </CartProvider>
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();
  const utils = render(ui, { wrapper: Wrapper });
  return { user, ...utils };
};

/**
 * Even faster render for pure component testing (no providers at all)
 */
export const renderComponent = (
  ui: ReactElement,
  { route = '/', routerProps = {} }: RenderFastOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <MemoryRouter initialEntries={[route]} {...routerProps}>
        {children}
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();
  const utils = render(ui, { wrapper: Wrapper });
  return { user, ...utils };
};
