import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Cart interaction helpers - these encapsulate common user actions
 */
export const cartActions = {
  async addTestItem() {
    const user = userEvent.setup();
    const addItemButton = screen.getByTestId('add-to-cart-button');
    await user.click(addItemButton);
  },

  async incrementQuantity() {
    const user = userEvent.setup();
    const incrementButton = screen.getByRole('button', { name: '+' });
    await user.click(incrementButton);
  },

  async decrementQuantity() {
    const user = userEvent.setup();
    const decrementButton = screen.getByRole('button', { name: '-' });
    await user.click(decrementButton);
  },

  async removeItem() {
    const user = userEvent.setup();
    const removeButton = screen.getAllByAltText('trash')[0];
    await user.click(removeButton);
  },

  async clickCheckout() {
    const user = userEvent.setup();
    const checkoutButton = screen.getByRole('button', {
      name: /finalizar pedido/i,
    });
    await user.click(checkoutButton);
  },

  async continueShopping() {
    const user = userEvent.setup();
    const continueButton = screen.getByRole('button', {
      name: /continuar comprando/i,
    });
    await user.click(continueButton);
  },
};
