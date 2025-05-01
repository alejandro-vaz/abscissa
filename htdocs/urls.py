# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORT VIEW
from extensions.view import *

# INITIALIZE PATTERNS
urlpatterns = []

# VIEWS
views = [
    "auth",
    "dashboard",
    "error",
    "problem"
]
for viewName in views:
    urlpatterns.append(URLS.path(viewName, loadView(viewName)))


# API
api = [
    "auth",
    "location",
    "problems",
    "resources",
    "users"
]
for apiName in api:
    urlpatterns.append(URLS.path(f'api/{apiName}', include(apiName).response))