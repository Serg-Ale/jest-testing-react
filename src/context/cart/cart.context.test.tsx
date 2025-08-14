import { render, screen, act } from '@testing-library/react';
import React, { useContext } from 'react';
import { CartContext, CartProvider } from './index';
import type { Product } from '../../types';

// Helper fábrica de produtos (mantida DRY para os testes)
const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: overrides.id ?? Math.floor(Math.random() * 100000),
  name: overrides.name ?? 'Produto',
  price: overrides.price ?? 10,
  description: overrides.description ?? 'Desc',
  category: overrides.category ?? 1,
  image: overrides.image ?? 'img.png',
  colors: overrides.colors ?? ['#fff'],
  sizes: overrides.sizes ?? ['M']
});

// Harness para encapsular acesso ao contexto e evitar repetição de act / ctx!
interface CartHarness {
  readonly ctx: React.ContextType<typeof CartContext>;
  add: (product: Product, quantity: number) => void;
  addRaw: (item: Product & { quantity: number }) => void;
  remove: (product: Product) => void;
  changeQuantity: (product: Product, quantity: number) => void;
  clear: () => void;
  items: () => (Product & { quantity: number })[];
}

const renderCart = (): CartHarness => {
  let current: React.ContextType<typeof CartContext> | undefined;

  const Consumer: React.FC = () => {
    const value = useContext(CartContext);
    current = value; // sempre mantém referência atualizada
    return <div data-testid="items-json">{JSON.stringify(value.items)}</div>;
  };

  render(
    <CartProvider>
      <Consumer />
    </CartProvider>
  );

  const getCtx = () => {
    if (!current) throw new Error('Contexto não inicializado');
    return current;
  };

  const wrap = <T,>(fn: () => T): T => {
    let result: T;
    act(() => {
      result = fn();
    });
    // @ts-expect-error result é sempre definido após act
    return result;
  };

  return {
    get ctx() { return getCtx(); },
    add: (product, quantity) => wrap(() => getCtx().addItem({ ...product, quantity })),
    addRaw: (item) => wrap(() => getCtx().addItem(item)),
    remove: (product) => wrap(() => getCtx().removeItem(product)),
    changeQuantity: (product, quantity) => wrap(() => getCtx().changeQuantity({ ...product, quantity })),
    clear: () => wrap(() => getCtx().clear()),
    items: () => getCtx().items
  };
};

describe('CartContext', () => {
  test('starts empty', () => {
    renderCart();
    expect(screen.getByTestId('items-json').textContent).toBe('[]');
  });

  test('addItem adds a new item', () => {
    const cart = renderCart();
    const p = makeProduct({ id: 1 });
    cart.add(p, 2);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0]).toMatchObject({ id: 1, quantity: 2 });
  });

  test('addItem can add two distinct items', () => {
    const cart = renderCart();
    cart.add(makeProduct({ id: 1 }), 1);
    cart.add(makeProduct({ id: 2 }), 3);
    expect(cart.items().map(i => i.id)).toEqual([1, 2]);
  });

  test('removeItem removes by id', () => {
    const cart = renderCart();
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    cart.add(p1, 1);
    cart.add(p2, 1);
    cart.remove(p1);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0].id).toBe(2);
  });

  test('changeQuantity updates only matching item', () => {
    const cart = renderCart();
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    cart.add(p1, 1);
    cart.add(p2, 5);
    cart.changeQuantity(p2, 7);
    expect(cart.items().find(i => i.id === 1)!.quantity).toBe(1);
    expect(cart.items().find(i => i.id === 2)!.quantity).toBe(7);
  });

  test('clear empties items', () => {
    const cart = renderCart();
    cart.add(makeProduct({ id: 1 }), 2);
    cart.add(makeProduct({ id: 2 }), 3);
    cart.clear();
    expect(cart.items()).toHaveLength(0);
  });

  test('changeQuantity with unknown id keeps state', () => {
    const cart = renderCart();
    const p1 = makeProduct({ id: 1 });
    cart.add(p1, 1);
    const firstRef = cart.items()[0];
    cart.changeQuantity(makeProduct({ id: 999 }), 10);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0]).toBe(firstRef);
    expect(cart.items()[0].quantity).toBe(1);
  });

  test('document current behavior: duplicate id allowed (adds two entries)', () => {
    const cart = renderCart();
    const base = makeProduct({ id: 123 });
    cart.add(base, 1);
    cart.add(base, 4);
    const sameIdItems = cart.items().filter(i => i.id === 123);
    expect(sameIdItems).toHaveLength(2);
    expect(sameIdItems.map(i => i.quantity)).toEqual([1, 4]);
  });
});
