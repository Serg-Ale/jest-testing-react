import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '@/test-utils/render';
import { mockNavigate } from '@/test-utils/routerMocks';

describe('Header', () => {
  test('renders and is visible', () => {
    renderWithProviders(<Header />, { withProviders: false });
    // Prefer semantic container role or landmark later; fallback to test id for now.
    expect(screen.getByTestId('header')).toBeVisible();
  });

  test('navigates home when clicking the logo image', async () => {
    const { user } = renderWithProviders(<Header />, { withProviders: false });
    const logo = screen.getByRole('img', { name: /logo/i });
    await user.click(logo);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to cart when clicking the cart icon', async () => {
    const { user } = renderWithProviders(<Header />, { withProviders: false });
    const cartIcon = screen.getByRole('img', { name: /cart/i });
    await user.click(cartIcon);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
