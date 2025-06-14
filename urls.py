#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> MODULES
import django.urls as urls

# HANDLER -> EXTENSIONS
from extensions.view import *

# HANDLER -> ACTIVATION
view_init()


#
#   URL PATTERNS
#

# URL PATTERNS -> INITIALIZATION
urlpatterns = []

# URL PATTERNS -> VIEWS
views = [
    "",
    "dashboard",
    "playground",
    "search",
    "settings",
    "stats",
    "user"
]

# URL PATTERNS -> API
scripts = [
    "auth",
    "location",
    "problems",
    "resources",
    "users"
]

# URL PATTERNS -> ADD PATTERNS
for view in views:
    urlpatterns.append(urls.path(view, create_view(view)))
for script in scripts:
    urlpatterns.append(urls.path(f'api/{script}', include(script).output))