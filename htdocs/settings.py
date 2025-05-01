DEBUG = True
DEBUG_PROPAGATE_EXCEPTIONS = True
SECRET_KEY = 'aoisdnoin28yh98ASN9inks'
ROOT_URLCONF = 'urls'
ALLOWED_HOSTS = ["*"]
MIDDLEWARE = ['django.middleware.common.CommonMiddleware']
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache'
    }
}
DATABASES = {
    'default': {
        'CONN_MAX_AGE': 3600
    }
}