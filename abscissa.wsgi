#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   GATEWAY
#

# GATEWAY -> PROJECT PATH
sys.path.insert(0, '/srv/www/abscissa')

# GATEWAY -> SETTINGS FILE
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# GATEWAY -> APPLICATION
application = wsgi.get_wsgi_application()