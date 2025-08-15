import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Header from './Header';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const renderHeader = () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe('Header', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    renderHeader();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the Header component', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('should navigate to home page when clicking the logo', async () => {
    const logo = screen.getByAltText('logo');
    await user.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).not.toHaveBeenCalledWith('/cart');
  });

  test('should navigate to cart page when clicking the cart icon', async () => {
    const cartIcon = screen.getByAltText('cart');
    await user.click(cartIcon);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
