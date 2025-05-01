#
#   GATEWAY
#

# GATEWAY -> IMPORTS
import os
import sys
from django.core.wsgi import get_wsgi_application

# GATEWAY -> PROJECT PATH
sys.path.insert(0, '/srv/www/abscissa')

# GATEWAY -> SETTINGS FILE
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# GATEWAY -> APPLICATION
application = get_wsgi_application()