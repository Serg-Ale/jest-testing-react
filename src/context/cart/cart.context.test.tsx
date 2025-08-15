import { render, act } from '@testing-library/react';
import React, { useContext } from 'react';
import { CartContext, CartProvider } from './index';
import type { Product } from '@/types';

// Deterministic factory (avoids randomness that could mask id collisions)
let nextId = 1;
const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: overrides.id ?? nextId++,
  name: overrides.name ?? 'Produto',
  price: overrides.price ?? 10,
  description: overrides.description ?? 'Desc',
  category: overrides.category ?? 1,
  image: overrides.image ?? 'img.png',
  colors: overrides.colors ?? ['#fff'],
  sizes: overrides.sizes ?? ['M']
});

// Minimal harness: rely on synchronous state updates (no manual act needed)
const renderCart = () => {
  const store: { current?: React.ContextType<typeof CartContext> } = {};

  const Consumer: React.FC = () => {
    store.current = useContext(CartContext);
    return null;
  };

  render(
    <CartProvider>
      <Consumer />
    </CartProvider>
  );

  const ctx = () => {
    if (!store.current) throw new Error('Contexto não inicializado');
    return store.current;
  };

  const wrap = (fn: () => void) => act(fn);

  return {
    add: (p: Product, q: number) => wrap(() => ctx().addItem({ ...p, quantity: q })),
    remove: (p: Product) => wrap(() => ctx().removeItem(p)),
    changeQuantity: (p: Product, q: number) => wrap(() => ctx().changeQuantity({ ...p, quantity: q })),
    clear: () => wrap(() => ctx().clear()),
    items: () => ctx().items
  };
};


describe('CartContext', () => {
  let cart: ReturnType<typeof renderCart>;

  beforeEach(() => {
    nextId = 1; // reset deterministic id sequence
    cart = renderCart();
  });

  test('should start with empty items array', () => {
    expect(cart.items()).toHaveLength(0);
  });

  test('should add a new item with specified quantity', () => {
    const p = makeProduct({ id: 1 });
    cart.add(p, 2);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0]).toMatchObject({ id: 1, quantity: 2 });
  });

  test('should add two distinct items preserving order', () => {
    cart.add(makeProduct({ id: 1 }), 1);
    cart.add(makeProduct({ id: 2 }), 3);
    expect(cart.items().map(i => i.id)).toEqual([1, 2]);
  });

  test('should remove an item by id', () => {
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    cart.add(p1, 1);
    cart.add(p2, 1);
    cart.remove(p1);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0].id).toBe(2);
  });

  test('should update quantity only for matching item id', () => {
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    cart.add(p1, 1);
    cart.add(p2, 5);
    cart.changeQuantity(p2, 7);
    expect(cart.items().find(i => i.id === 1)!.quantity).toBe(1);
    expect(cart.items().find(i => i.id === 2)!.quantity).toBe(7);
  });

  test('should clear all items', () => {
    cart.add(makeProduct({ id: 1 }), 2);
    cart.add(makeProduct({ id: 2 }), 3);
    cart.clear();
    expect(cart.items()).toHaveLength(0);
  });

  test('should keep state when changing quantity for unknown id', () => {
    const p1 = makeProduct({ id: 1 });
    cart.add(p1, 1);
  cart.changeQuantity(makeProduct({ id: 999 }), 10); // unrelated id
  const only = cart.items()[0];
  expect(cart.items()).toHaveLength(1);
  expect(only.id).toBe(1);
  expect(only.quantity).toBe(1);
  });

  test('documents current behavior: duplicate ids create separate entries', () => {
    const base = makeProduct({ id: 123 });
    cart.add(base, 1);
    cart.add(base, 4);
    const sameIdItems = cart.items().filter(i => i.id === 123);
    expect(sameIdItems).toHaveLength(2);
    expect(sameIdItems.map(i => i.quantity)).toEqual([1, 4]);
  });
});
