/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import type { Category } from '@/types';

export const CategoriesContext = createContext<{
	categories: Category[];
}>({
	categories: [],
});

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetch('http://localhost:3001/categories')
			.then((res) => res.json())
			.then((data) => setCategories(data));
	}, []);

	return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>;
};
