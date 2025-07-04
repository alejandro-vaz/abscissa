#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   SETTINGS
#

# SETTINGS -> DEBUG
DEBUG = False
DEBUG_PROPAGATE_EXCEPTIONS = True

# SETTINGS -> SECRET KEY
SECRET_KEY = secrets.token_urlsafe(64)

# SETTINGS -> ALLOWED HOSTS
ALLOWED_HOSTS = ["abscissa.eu", "abscissa.gamusino.net"]

# SETTINGS -> URLS
ROOT_URLCONF = 'urls'

# SETTINGS -> MIDDLEWARE
MIDDLEWARE = ['django.middleware.common.CommonMiddleware']

# SETTINGS -> AUTOFIELD
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# SETTINGS -> DATABASE
DATABASES = {
    'default': {
        'CONN_MAX_AGE': 72000
    }
}