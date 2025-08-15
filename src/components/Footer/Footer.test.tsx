import { screen } from '@testing-library/react';
import Footer from './Footer';
import { renderWithProviders } from '@/test-utils/render';

describe('Footer', () => {
  test('renders semantic footer with logo and current year', () => {
    renderWithProviders(<Footer />, { withProviders: false });
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeVisible();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(footer).toHaveTextContent(new Date().getFullYear().toString());
  });
});