#
#   SETTINGS
#

# SETTINGS -> DEBUG
DEBUG = False
DEBUG_PROPAGATE_EXCEPTIONS = False

# SETTINGS -> SECRET KEY
SECRET_KEY = 'aoisdnoin28yh98ASN9inks'

# SETTINGS -> ALLOWED HOSTS
ALLOWED_HOSTS = ["*"]

# SETTINGS -> URLS
ROOT_URLCONF = 'urls'

# SETTINGS -> MIDDLEWARE
MIDDLEWARE = ['django.middleware.common.CommonMiddleware']

# SETTINGS -> AUTOFIELD
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# SETTINGS -> CACHE
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache'
    }
}

# SETTINGS -> DATABASE
DATABASES = {
    'default': {
        'CONN_MAX_AGE': 72000
    }
}