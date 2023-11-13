import os

from dotenv import load_dotenv

load_dotenv()

MAIL_SERVER = os.environ.get('MAIL_SERVER')
MAIL_PORT = os.environ.get('MAIL_PORT')
MAIL_USE_SSL = True
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

TOKEN = os.environ.get('TOKEN')
CHAT_IDs = [os.environ.get('MAIN_CHAT_ID')]

ADMINS = [os.environ.get('ADMIN_EMAIL'), os.environ.get('DEVELOPER_EMAIL')]
