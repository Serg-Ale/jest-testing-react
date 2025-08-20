import { useCart } from '../../../context';
import { testProduct } from './cart.fixtures';

/**
 * Stub component that allows adding test items to cart
 */
export const CartTestStub = () => {
  const { addItem } = useCart();

  const addTestItem = () => {
    addItem(testProduct);
  };

  return (
    <div>
      <button data-testid="add-to-cart-button" onClick={addTestItem}>
        Add to Cart
      </button>
    </div>
  );
};
