import type { Product } from '../../../types';

/**
 * Test data and fixtures for cart testing
 */
export const testProduct: Product & { quantity: number } = {
  id: 1,
  name: 'Test Product',
  price: 100,
  quantity: 1,
  image: 'test.jpg',
  description: 'Test Description',
  category: 1,
  colors: ['red', 'blue'],
  sizes: ['M', 'L'],
};
