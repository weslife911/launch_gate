from pathlib import Path
from datetime import timedelta
import os
from decouple import config
import dj_database_url

# Email Configuration
EMAIL_BACKEND = config("EMAIL_BACKEND")
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT")
EMAIL_USE_TLS = True

# Using decouple to fetch credentials
EMAIL_HOST_USER = config('ADMIN_EMAIL')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('ADMIN_EMAIL')

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY")
DEBUG = False

ALLOWED_HOSTS = [".vercel.app", "127.0.0.1", "localhost"]

AUTH_USER_MODEL = "users.User"

INSTALLED_APPS = [
    "jazzmin",  # Must stay at the top
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "api",
    "users",
    "referral",
    "contact",
    "rest_framework",
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'launch_gate_backend.urls'

# ADDED THIS: Fixed your TEMPLATES error
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ADDED THIS: Missing application pointer
WSGI_APPLICATION = 'launch_gate_backend.wsgi.application'

DATABASES = {
    'default': dj_database_url.config(
        default=str(config("SUPABASE_DB_URL")),
        conn_max_age=600,
        ssl_require=True
    )
}

# CONSOLIDATED CORS SETTINGS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://launch-gate.vercel.app"
]
CORS_ALLOW_CREDENTIALS = True

# REST & JWT CONFIG
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=50),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'