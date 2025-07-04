#
#   MODULES
#

# MODULES -> LOAD
import os
import sys
from django.core import wsgi

#
#   GATEWAY
#

# GATEWAY -> SETUP
sys.path.append('/srv/www')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'website.settings')
sys.path.append('/srv/www/website')
application = wsgi.get_wsgi_application()