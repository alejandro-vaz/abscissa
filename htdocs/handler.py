#
#   INITIALIZATION
#

# INITIALIZATION -> DJANGO

from django import conf as CONF
from django.core import management as CORE_MANAGEMENT
from django.core import wsgi as CORE_WSGI
from django import http as HTTP
from django import urls as URLS
from django.views.decorators.csrf import csrf_exempt

# INITIALIZATION -> IMPORTS
import os
import sys
import json
import zlib
import base64
import threading
import SUG
from random import randint
from secrets import token_hex
from re import compile, match
from re import DOTALL as dotall
from re import Pattern as pattern
from pathlib import Path as create_path
from Cryptodome.Cipher import AES as aes
from datetime import datetime, timedelta
from Cryptodome.Hash import SHA256 as sha256
from Cryptodome.Random import get_random_bytes
from Cryptodome.Util.Padding import pad, unpad
from mysql.connector import MySQLConnection, Error, connect
from importlib.util import module_from_spec, spec_from_file_location


# INITIALIZATION -> DIRECTORY
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


#
#   MANAGER
#

def include(name):
    rel = os.path.join("api", f"{name}.py")

    # Turn the relative path into an absolute one
    path = os.path.join(BASE_DIR, rel)

    spec = spec_from_file_location(name, path)
    module = module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# MANAGER -> FILE READER
def read(path: str) -> str:
    full_path = os.path.join(BASE_DIR, path)
    return create_path(full_path).read_text(encoding='utf-8')