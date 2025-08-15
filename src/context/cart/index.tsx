/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { Product } from '@/types';

export const CartContext = createContext<{
	items: (Product & { quantity: number })[];
	addItem: (item: Product & { quantity: number }) => void;
	removeItem: (item: Product) => void;
	clear: () => void;
	changeQuantity: (item: Product & { quantity: number }) => void;
}>({
	items: [],
	addItem: () => {},
	removeItem: () => {},
	clear: () => {},
	changeQuantity: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [items, setItems] = useState<(Product & { quantity: number })[]>([]);

	// Usar forma funcional para evitar condições de corrida e capturas de closure obsoletas
	const changeQuantity = (item: Product & { quantity: number }) => {
		setItems(prev => prev.map(i => (i.id === item.id ? item : i)));
	};

	const addItem = (item: Product & { quantity: number }) => {
		setItems(prev => [...prev, item]);
	};

	const removeItem = (item: Product) => {
		setItems(prev => prev.filter(i => i.id !== item.id));
	};

	const clear = () => {
		setItems([]);
	};

	return (
		<CartContext.Provider value={{ items, addItem, removeItem, clear, changeQuantity }}>
			{children}
		</CartContext.Provider>
	);
};
