#
#   EXCEPTIONS
#
    
# EXCEPTIONS -> ERROR DEFINITION
class PyError(Exception):
    message = "An error was raised."
    def __init__(self, **kwargs):
        self.kwargs = kwargs
        display = self.message.format(**kwargs)
        super().__init__(display)
    
# EXCEPTIONS -> ERRORS
class DatabaseConnectionError(PyError):
    message = "An error ocurred whilst trying to access database {name} with {user}@{host} with password: {password}"
class DatabaseQueryError(PyError):
    message = "An error ocurred whilst processing the arguments in the following query: {query}"
class APIScriptNotFoundError(PyError):
    message = "API Script {name}.py was not found."
class ModuleNotFoundError(PyError):
    message = "Module of type {area} named {name} not found"
class FileNotReadableError(PyError):
    message = "The file {path} is not readable."
class UnknownHTMLpyCommandError(PyError):
    message = "Encountered unknown command: {command}"


#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import os
import sys
import importlib.util as util
import pathlib
import threading
from django import http
import django.urls as urls
import re
import django.core.wsgi as wsgi

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   MANAGER
#

# MANAGER -> INCLUDE PYTHON FILE
def include(name: str) -> object:
    path = os.path.join(SUG.DIR, os.path.join("api", f"{name}.py"))
    try:
        spec = util.spec_from_file_location(name, path)
    except:
        raise APIScriptNotFoundError(name = name)
    module = util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# MANAGER -> FILE READER
def read(path: str) -> str:
    try:
        return pathlib.Path(os.path.join(SUG.DIR, path)).read_text(encoding='utf-8')
    except:
        raise FileNotReadableError(path = path)