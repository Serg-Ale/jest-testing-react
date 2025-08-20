import { screen } from '@testing-library/react';

/**
 * Test selectors - centralized element queries
 */
export const cartSelectors = {
  getCheckoutButton: () =>
    screen.getByRole('button', { name: /finalizar pedido/i }),
  getContinueShoppingButton: () =>
    screen.getByRole('button', { name: /continuar comprando/i }),
  getIncrementButton: () => screen.getByRole('button', { name: '+' }),
  getDecrementButton: () => screen.getByRole('button', { name: '-' }),
  getRemoveButtons: () => screen.getAllByAltText('trash'),
  getAddToCartButton: () => screen.getByTestId('add-to-cart-button'),
};
