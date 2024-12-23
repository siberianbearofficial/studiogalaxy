from datetime import datetime
from enum import Enum
from typing import Union, Optional, Any

from pydantic import BaseModel


class Price(BaseModel):
    rubles: int
    pennies: int


class Certificate(BaseModel):
    id: str
    name: str
    img: str
    price: Price
    old_price: Price
    description_points: list[str]


class AdditionalService(BaseModel):
    id: str
    name: str
    description: str
    price: Price
    img: str


class CartItemType(Enum):
    Certificate = "certificate"
    AdditionalService = "additional_service"


class CartItemForTemplate(BaseModel):
    name: str
    price_str: str


class CartItem(BaseModel):
    id: str
    type: CartItemType
    data: Union[Certificate, AdditionalService]

    def for_template(self) -> CartItemForTemplate:
        return CartItemForTemplate(
            name=self.data.name,
            price_str=f"{self.data.price.rubles:02}.{self.data.price.pennies:02} р.",
        )


class PaymentType(str, Enum):
    Cash = "cash"
    Cashless = "cashless"


class PaymentTypeText(str, Enum):
    Cash = "Наличными во время записи"
    Cashless = "Безналичная оплата"


paymentTypeToTextMap = {
    PaymentType.Cash: PaymentTypeText.Cash,
    PaymentType.Cashless: PaymentTypeText.Cashless,
}


def payment_type_to_text(payment_type: PaymentType) -> str:
    return paymentTypeToTextMap[payment_type].value


class OrderDetailsForTemplate(BaseModel):
    name: str
    recipient: Optional[str] = None
    email: str
    tel: str
    promo: Optional[str] = None
    comment: Optional[str] = None
    payment_type_text: str


class OrderDetails(BaseModel):
    name: str
    recipient: Optional[str] = None
    email: str
    tel: str
    promo: Optional[str] = None
    comment: Optional[str] = None
    payment_type: PaymentType

    def for_template(self) -> OrderDetailsForTemplate:
        return OrderDetailsForTemplate(
            name=self.name,
            recipient=self.recipient,
            email=self.email,
            tel=self.tel,
            promo=self.promo,
            comment=self.comment,
            payment_type_text=payment_type_to_text(self.payment_type),
        )


class OrderDetailsV2(BaseModel):
    name: str
    email: str
    tel: str
    promo: Optional[str] = None
    comment: Optional[str] = None


class OrderCreateForTemplate(BaseModel):
    created_at_str: str
    total_str: str
    items: list[CartItemForTemplate]
    details: OrderDetailsForTemplate


class OrderCreate(BaseModel):
    items: list[CartItem]
    details: OrderDetails

    def for_template(self, created_at: datetime, total: Price) -> OrderCreateForTemplate:
        return OrderCreateForTemplate(
            created_at_str=created_at.strftime("%d %B %Y %H:%M:%S"),
            total_str=f"{total.rubles:02}.{total.pennies:02} р.",
            items=list(map(lambda item: item.for_template(), self.items)),
            details=self.details.for_template(),
        )


class OrderCreateV2ForTemplate(BaseModel):
    created_at_str: str
    items: list[CartItemForTemplate]
    details: OrderDetailsV2


class OrderCreateV2(BaseModel):
    items: list[CartItem]
    details: OrderDetailsV2

    def for_template(self, created_at: datetime) -> OrderCreateV2ForTemplate:
        return OrderCreateV2ForTemplate(
            created_at_str=created_at.strftime("%d %B %Y %H:%M:%S"),
            items=list(map(lambda item: item.for_template(), self.items)),
            details=self.details,
        )


class ApiResponse(BaseModel):
    data: Any
    detail: str


class PostOrdersApiResponse(BaseModel):
    data: None = None
    detail: str = "Order was created."
