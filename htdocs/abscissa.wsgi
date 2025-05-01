import os
import sys

# Add project path
sys.path.insert(0, '/srv/www/abscissa')

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# Get WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()