import { waitFor } from '@testing-library/react';
import { renderCart, cartActions, cartAssertions } from '../test-utils/cart.test-utils';

// Mock setup
const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Cart Screen - Checkout Process', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('should finalize the cart when checkout button is clicked', async () => {
    await renderCart();

    await cartActions.addTestItem();
    cartAssertions.expectProductInCart();

    await cartActions.clickCheckout();
    cartAssertions.expectProcessingState();

    await waitFor(
      () => {
        cartAssertions.expectOrderSuccess();
      },
      { timeout: 1000 }
    );
  });
});
