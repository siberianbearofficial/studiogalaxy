from urllib.parse import urlencode

import aiohttp

from config import get_telegram_bot_settings


async def send(msg: str):
    async with aiohttp.ClientSession() as session:
        for chat_id in get_telegram_bot_settings().chat_id_list:
            await session.get(prepare_url(msg, chat_id))


def prepare_url(msg: str, chat_id: str) -> str:
    bot_token = f"bot{get_telegram_bot_settings().token}"
    params = {
        "chat_id": chat_id,
        "text": msg,
    }

    return f"https://api.telegram.org/{bot_token}/sendMessage?{urlencode(params)}"
