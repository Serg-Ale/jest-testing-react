import { renderCart, cartActions, cartAssertions } from '../test-utils/cart.test-utils';

// Mock setup
const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Cart Screen - Empty State', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('should render empty cart message when there are no items in the cart', async () => {
    await renderCart();
    
    cartAssertions.expectEmptyCart();
  });

  test('should navigate to home when continue shopping button is clicked', async () => {
    await renderCart();

    await cartActions.continueShopping();
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
