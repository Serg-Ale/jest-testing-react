import { renderCart, cartActions, cartAssertions } from '../test-utils/cart.test-utils';

// Mock setup
const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Cart Screen - Item Management', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('should show the item that was added to the cart', async () => {
    await renderCart();

    await cartActions.addTestItem();

    cartAssertions.expectProductInCart();
    cartAssertions.expectQuantity(1);
  });

  test('should increment item quantity when + button is clicked', async () => {
    await renderCart();

    await cartActions.addTestItem();
    await cartActions.incrementQuantity();

    cartAssertions.expectQuantity(2);
  });

  test('should decrement item quantity when - button is clicked', async () => {
    await renderCart();

    await cartActions.addTestItem();
    await cartActions.incrementQuantity();
    cartAssertions.expectQuantity(2);

    await cartActions.decrementQuantity();

    cartAssertions.expectQuantity(1);
  });

  test('should remove item from cart when trash button is clicked', async () => {
    await renderCart();

    await cartActions.addTestItem();
    cartAssertions.expectProductInCart();

    await cartActions.removeItem();

    cartAssertions.expectProductNotInCart();
  });
});
