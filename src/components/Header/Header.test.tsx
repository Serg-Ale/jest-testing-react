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
  test('renders Header component', () => {
    renderHeader();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
  test('should navigate to home on logo click', async () => {
    renderHeader();
    const user = userEvent.setup();
    const logo = screen.getByAltText('logo');
    await user.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).not.toHaveBeenCalledWith('/cart');
  });
});
