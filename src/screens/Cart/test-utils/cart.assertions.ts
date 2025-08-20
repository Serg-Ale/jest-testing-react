import { screen } from '@testing-library/react';
import { testProduct } from './cart.fixtures';

/**
 * Cart assertion helpers - these encapsulate common assertions
 */
export const cartAssertions = {
  expectEmptyCart() {
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  },

  expectProductInCart() {
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
  },

  expectProductNotInCart() {
    expect(screen.queryByText(testProduct.name)).not.toBeInTheDocument();
  },

  expectQuantity(quantity: number) {
    expect(screen.getByText(quantity.toString())).toBeInTheDocument();
  },

  expectProcessingState() {
    expect(screen.getByText('Processando...')).toBeInTheDocument();
  },

  expectOrderSuccess() {
    expect(screen.getByText('Pedido Realizado!')).toBeInTheDocument();
    expect(
      screen.getByText('Seu pedido foi processado com sucesso')
    ).toBeInTheDocument();
  },
};
