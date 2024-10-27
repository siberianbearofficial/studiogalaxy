import { Price } from '../../core/domain/entities/price';
import { CartItem } from '../../core/domain/entities/cart-item';

export const priceToPennies = (price: Price): number => 100 * price.rubles + price.pennies;

export const penniesToPrice = (pennies: number): Price => {
    const rubles = Math.floor(pennies / 100);

    return { rubles, pennies: pennies - 100 * rubles };
};

export const sumPrices = (prices: Price[]): Price => penniesToPrice(
    prices.map(priceToPennies).reduce((sum, current) => sum + current, 0),
);

export const removeCartItemById = (id: string, items: CartItem[]): CartItem[] => items.filter(i => i.id !== id);
