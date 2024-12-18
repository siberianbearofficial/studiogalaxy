import aiofiles
from datetime import datetime, timezone, timedelta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Template

import telegram_handler
from schema import OrderCreate, PostOrdersApiResponse, Price

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "https://studiogalaxy.ru",
    ],
    allow_origin_regex=r"https://.*\.studiogalaxy\.netlify\.app",
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True,
)


def calc_total(order: OrderCreate) -> Price:
    total_pennies = sum(map(lambda item: item.data.price.rubles * 100 + item.data.price.pennies, order.items))
    return Price(rubles=total_pennies // 100, pennies=total_pennies % 100)


@app.post("/api/v1/orders", response_model=PostOrdersApiResponse)
async def create_order(order: OrderCreate):
    created_at = datetime.now(tz=timezone(timedelta(hours=3)))
    total = calc_total(order)

    async with aiofiles.open("order_notification_template.txt") as f:
        template_txt = await f.read()

    template = Template(template_txt, enable_async=True)
    msg = await template.render_async(order=order.for_template(created_at, total))

    await telegram_handler.send(msg)

    return PostOrdersApiResponse()
