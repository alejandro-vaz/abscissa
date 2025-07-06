#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import os
import sys
from importlib import util
import pathlib
import threading
from django.http import HttpRequest, HttpResponse, JsonResponse
from django import urls
import re
import secrets

# INITIALIZATION -> SUPERGLOBALS
import SUG

#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: object):
    for variable in variables:
        print(repr(variable), file=sys.stderr)