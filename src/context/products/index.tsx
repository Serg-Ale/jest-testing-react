/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import type { Product } from '@/types';

export const ProductsContext = createContext<{
	products: Product[];
	selectedProduct: Product | null;
	setSelectedProduct: (product: Product | null) => void;
}>({
	products: [],
	selectedProduct: null,
	setSelectedProduct: () => {},
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	useEffect(() => {
		fetch('http://localhost:3001/products')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<ProductsContext.Provider value={{ products, selectedProduct, setSelectedProduct }}>
			{children}
		</ProductsContext.Provider>
	);
};
