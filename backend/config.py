from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class TelegramBotSettings(BaseSettings):
    token: str
    chat_id_list: list[str]

    model_config = SettingsConfigDict(env_prefix="tgbot_")


@lru_cache
def get_telegram_bot_settings() -> TelegramBotSettings:
    return TelegramBotSettings()
