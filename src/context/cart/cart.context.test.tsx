import { render, screen, act } from '@testing-library/react';
import React, { useContext } from 'react';
import { CartContext, CartProvider } from './index';
import type { Product } from '../../types';

// Utilitário: cria um produto base com override de campos
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

// Componente consumidor simples para expor estado em texto
const TestConsumer: React.FC<{ onRender?: (value: React.ContextType<typeof CartContext>) => void }> = ({ onRender }) => {
  const value = useContext(CartContext);
  onRender?.(value);
  return <div data-testid="items-json">{JSON.stringify(value.items)}</div>;
};

const setup = (onRender?: (value: React.ContextType<typeof CartContext>) => void) => {
  return render(
    <CartProvider>
      <TestConsumer onRender={onRender} />
    </CartProvider>
  );
};

describe('CartContext', () => {
  test('starts empty', () => {
    setup();
    expect(screen.getByTestId('items-json').textContent).toBe('[]');
  });

  test('addItem adds a new item', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    const product = makeProduct({ id: 1 });
    act(() => {
      ctx!.addItem({ ...product, quantity: 2 });
    });
    expect(ctx!.items).toHaveLength(1);
    expect(ctx!.items[0]).toMatchObject({ id: 1, quantity: 2 });
  });

  test('addItem can add two distinct items', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    act(() => {
      ctx!.addItem({ ...makeProduct({ id: 1 }), quantity: 1 });
      ctx!.addItem({ ...makeProduct({ id: 2 }), quantity: 3 });
    });
    expect(ctx!.items.map(i => i.id)).toEqual([1, 2]);
  });

  test('removeItem removes by id', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    act(() => {
      ctx!.addItem({ ...p1, quantity: 1 });
      ctx!.addItem({ ...p2, quantity: 1 });
      ctx!.removeItem(p1);
    });
    expect(ctx!.items).toHaveLength(1);
    expect(ctx!.items[0].id).toBe(2);
  });

  test('changeQuantity updates only matching item', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    const p1 = makeProduct({ id: 1 });
    const p2 = makeProduct({ id: 2 });
    act(() => {
      ctx!.addItem({ ...p1, quantity: 1 });
      ctx!.addItem({ ...p2, quantity: 5 });
      ctx!.changeQuantity({ ...p2, quantity: 7 });
    });

    expect(ctx!.items.find(i => i.id === 1)!.quantity).toBe(1);
    expect(ctx!.items.find(i => i.id === 2)!.quantity).toBe(7);
  });

  test('clear empties items', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    act(() => {
      ctx!.addItem({ ...makeProduct({ id: 1 }), quantity: 2 });
      ctx!.addItem({ ...makeProduct({ id: 2 }), quantity: 3 });
      ctx!.clear();
    });
    expect(ctx!.items).toHaveLength(0);
  });

  test('changeQuantity with unknown id keeps state', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    const p1 = makeProduct({ id: 1 });
    act(() => {
      ctx!.addItem({ ...p1, quantity: 1 });
    });
    const firstRef = ctx!.items[0];
    act(() => {
      ctx!.changeQuantity({ ...makeProduct({ id: 999 }), quantity: 10 });
    });
    expect(ctx!.items).toHaveLength(1);
    expect(ctx!.items[0]).toBe(firstRef); // mesma referência do item
    expect(ctx!.items[0].quantity).toBe(1);
  });

  test('document current behavior: duplicate id allowed (adds two entries)', () => {
    let ctx: React.ContextType<typeof CartContext> | undefined;
    setup(v => (ctx = v));
    const base = makeProduct({ id: 123 });
    act(() => {
      ctx!.addItem({ ...base, quantity: 1 });
      ctx!.addItem({ ...base, quantity: 4 });
    });
    // Dois itens com mesmo id coexistem
    const sameIdItems = ctx!.items.filter(i => i.id === 123);
    expect(sameIdItems).toHaveLength(2);
    expect(sameIdItems.map(i => i.quantity)).toEqual([1, 4]);
  });
});
