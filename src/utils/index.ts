import type { testProduct } from './types';



function isNumber(val: unknown): val is number {
	return typeof val === 'number' && !isNaN(val);
}

export const formatPrice = (price: unknown): string => {
	const safePrice = isNumber(price) ? price : 0;
	return safePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
};

export const calculateTotalPrice = (products: (testProduct & { quantity: number })[] | unknown): number => {
	if (!Array.isArray(products)) {
		return 0;
	}
	return products.reduce((acc, curr) => {
		if (!curr || !isNumber((curr as testProduct & { quantity: number }).price) || !isNumber((curr as testProduct & { quantity: number }).quantity)) {
			return acc;
		}
		const item = curr as testProduct & { quantity: number };
		return acc + (item.price * item.quantity);
	}, 0);
};

export const calculateTotalPriceWithDiscount = (
	products: (testProduct & { quantity: number })[] | unknown,
	discount: number | unknown
): number => {
	if (!Array.isArray(products)) {
		return 0;
	}
	const safeDiscount = isNumber(discount)
		? discount < 0
			? 0
			: discount > 100
			? 100
			: discount
		: 0;
	const total = calculateTotalPrice(products);
	return total * (1 - safeDiscount / 100);
};