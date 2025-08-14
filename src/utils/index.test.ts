
import { calculateTotalPrice, calculateTotalPriceWithDiscount, formatPrice } from '.';
import type { testProduct } from './types';

describe('utils', () => {
  const products: testProduct[] = [
    { id: 1, name: 'Product 1', price: 1000 },
    { id: 2, name: 'Product 2', price: 2000 },
    { id: 3, name: 'Product 3', price: 3000 },
    { id: 4, name: 'Product 4', price: 4000 }
  ];

  describe('formatPrice', () => {
    it('formats price in BRL correctly', () => {
      expect(formatPrice(1000)).toBe('R$1.000,00');
      expect(formatPrice(0)).toBe('R$0,00');
      expect(formatPrice(1234567.89)).toBe('R$1.234.567,89');
    });
    it('returns R$0,00 for string or invalid price', () => {
      expect(formatPrice('1000')).toBe('R$0,00');
      expect(formatPrice(null)).toBe('R$0,00');
      expect(formatPrice(undefined)).toBe('R$0,00');
      expect(formatPrice(NaN)).toBe('R$0,00');
    });
  });

  describe('calculateTotalPrice', () => {
    it('returns 0 for empty array', () => {
      expect(calculateTotalPrice([])).toBe(0);
    });
    it('calculates total price for products', () => {
      expect(calculateTotalPrice(products)).toBe(10000);
    });
    it('handles single product', () => {
      const single: testProduct[] = [{ id: 1, name: 'A', price: 42 }];
      expect(calculateTotalPrice(single)).toBe(42);
    });
    it('handles negative prices', () => {
      const negative: testProduct[] = [{ id: 1, name: 'A', price: -10 }];
      expect(calculateTotalPrice(negative)).toBe(-10);
    });
    it('returns 0 for non-array input', () => {
      expect(calculateTotalPrice('not an array')).toBe(0);
      expect(calculateTotalPrice(null)).toBe(0);
    });
    it('ignores product with string price', () => {
      expect(calculateTotalPrice([{ id: 1, name: 'A', price: '100' } as unknown as testProduct])).toBe(0);
    });
    it('ignores product with missing price', () => {
      expect(calculateTotalPrice([{ id: 1, name: 'A' } as unknown as testProduct])).toBe(0);
    });
  });

  describe('calculateTotalPriceWithDiscount', () => {
    it('returns 0 for empty array', () => {
      expect(calculateTotalPriceWithDiscount([], 10)).toBe(0);
    });
    it('applies 0% discount', () => {
      expect(calculateTotalPriceWithDiscount(products, 0)).toBe(10000);
    });
    it('applies 10% discount', () => {
      expect(calculateTotalPriceWithDiscount(products, 10)).toBe(9000);
    });
    it('applies 100% discount', () => {
      expect(calculateTotalPriceWithDiscount(products, 100)).toBe(0);
    });
    it('applies >100% discount (should not be negative)', () => {
      expect(calculateTotalPriceWithDiscount(products, 200)).toBe(0);
    });
    it('handles negative discount (should not increase price)', () => {
      expect(calculateTotalPriceWithDiscount(products, -10)).toBe(10000);
    });
    it('handles single product', () => {
      const single: testProduct[] = [{ id: 1, name: 'A', price: 100 }];
      expect(calculateTotalPriceWithDiscount(single, 50)).toBe(50);
    });
    it('handles negative prices', () => {
      const negative: testProduct[] = [{ id: 1, name: 'A', price: -100 }];
      expect(calculateTotalPriceWithDiscount(negative, 10)).toBe(-90);
    });
    it('returns 0 for non-array products', () => {
      expect(calculateTotalPriceWithDiscount('not an array', 10)).toBe(0);
    });
    it('treats string/invalid discount as 0', () => {
      expect(calculateTotalPriceWithDiscount(products, '10')).toBe(10000);
      expect(calculateTotalPriceWithDiscount(products, null)).toBe(10000);
      expect(calculateTotalPriceWithDiscount(products, undefined)).toBe(10000);
      expect(calculateTotalPriceWithDiscount(products, NaN)).toBe(10000);
    });
    it('ignores product with string price', () => {
      expect(calculateTotalPriceWithDiscount([{ id: 1, name: 'A', price: '100' } as unknown as testProduct], 10)).toBe(0);
    });
  });
});
