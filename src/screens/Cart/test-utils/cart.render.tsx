import { act } from '@testing-library/react';
import { renderFast } from '../../../test-utils/render-fast';
import Cart from '..';
import { CartTestStub } from './cart.test-components';

/**
 * Renders the Cart component with essential providers only (no network calls)
 * Much faster than full context providers for cart-specific tests
 */
export const renderCart = async () => {
  let result: ReturnType<typeof renderFast>;
  
  await act(async () => {
    result = renderFast(
      <>
        <CartTestStub />
        <Cart />
      </>
    );
  });
  
  return result!;
};
