import { screen } from '@testing-library/react';
import Cart from '@/screens/Cart';
import { mockNavigate } from '@/test-utils/routerMocks';
import { renderWithProviders } from '@/test-utils/render';

describe('Cart Screen', () => {
	test('should render empty cart state when no items', async () => {
		renderWithProviders(<Cart />);
		expect(await screen.findByText(/Seu carrinho está vazio/i)).toBeInTheDocument();
	});

	test('should navigate home when clicking Continue Shopping button', async () => {
		const { user } = renderWithProviders(<Cart />);
		const button = await screen.findByRole('button', { name: /continuar comprando/i });
		await user.click(button);
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});
});


