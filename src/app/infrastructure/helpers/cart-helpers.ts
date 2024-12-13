import { Price } from '../../core/domain/entities/price';
import { CartItem, CartItemData, CartItemType } from '../../core/domain/entities/cart-item';
import { Order } from '../../core/domain/entities/order';
import { OrderModel } from '../models/order-model';
import { CartItemModel, CartItemModelData, CartItemModelType } from '../models/cart-item-model';
import { OrderDetailsModel, PaymentTypeModel } from '../models/order-details-model';
import { OrderDetails, PaymentType } from '../../core/domain/entities/order-details';
import { Certificate } from '../../core/domain/entities/certificate';
import { CertificateModel } from '../models/certificate-model';
import { AdditionalService } from '../../core/domain/entities/additional-service';
import { AdditionalServiceModel } from '../models/additional-service-model';
import { PriceModel } from '../models/price-model';

export const priceToPennies = (price: Price): number => 100 * price.rubles + price.pennies;

export const penniesToPrice = (pennies: number): Price => {
    const rubles = Math.floor(pennies / 100);

    return { rubles, pennies: pennies - 100 * rubles };
};

export const sumPrices = (prices: Price[]): Price => penniesToPrice(
    prices.map(priceToPennies).reduce((sum, current) => sum + current, 0),
);

export const removeCartItemById = (id: string, items: CartItem[]): CartItem[] => items.filter(i => i.id !== id);

const cartItemTypeModelMap: Record<CartItemType, CartItemModelType> = {
    [CartItemType.Certificate]: CartItemModelType.Certificate,
    [CartItemType.AdditionalService]: CartItemModelType.AdditionalService,
} as const;

export const mapCartItemTypeToModel = (type: CartItemType): CartItemModelType => cartItemTypeModelMap[type] || CartItemModelType.Certificate;

export const mapPriceToModel = ({ rubles, pennies }: Price): PriceModel => ({ rubles, pennies });

export const mapCertificateToModel = ({
                                          id,
                                          name,
                                          img,
                                          price,
                                          oldPrice,
                                          descriptionPoints,
                                      }: Certificate): CertificateModel => ({
    id, name, img,
    price: mapPriceToModel(price),
    old_price: mapPriceToModel(oldPrice),
    description_points: [...descriptionPoints],
});

export const mapAdditionalServiceToModel = ({
                                                id,
                                                name,
                                                description,
                                                price,
                                                img,
                                            }: AdditionalService): AdditionalServiceModel => ({
    id, name, description, img,
    price: mapPriceToModel(price),
});

const cartItemDataToModelMappers: Record<CartItemType, CallableFunction> = {
    [CartItemType.Certificate]: mapCertificateToModel,
    [CartItemType.AdditionalService]: mapAdditionalServiceToModel,
} as const;

export const mapCartItemDataToModel = (type: CartItemType, data: CartItemData): CartItemModelData => cartItemDataToModelMappers[type](data);

export const mapCartItemToModel = ({ id, type, data }: CartItem): CartItemModel => ({
    id,
    type: mapCartItemTypeToModel(type),
    data: mapCartItemDataToModel(type, data),
});

export const mapCartItemsToModels = (items: CartItem[]): CartItemModel[] => items.map(mapCartItemToModel);

const paymentTypeToModelMap: Record<PaymentType, PaymentTypeModel> = {
    [PaymentType.Cash]: PaymentTypeModel.Cash,
    [PaymentType.Cashless]: PaymentTypeModel.Cashless,
} as const;

export const mapPaymentTypeToModel = (type: PaymentType): PaymentTypeModel => paymentTypeToModelMap[type] || PaymentTypeModel.Cash;

export const mapOrderDetailsToModel = ({
                                           name,
                                           recipient,
                                           email,
                                           tel,
                                           promo,
                                           comment,
                                           paymentType,
                                       }: OrderDetails): OrderDetailsModel => ({
    name, recipient, email, tel, promo, comment,
    payment_type: mapPaymentTypeToModel(paymentType),
});

export const mapOrderToModel = (order: Order): OrderModel => ({
    items: mapCartItemsToModels(order.items),
    details: mapOrderDetailsToModel(order.details),
});
