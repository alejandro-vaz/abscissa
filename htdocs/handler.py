#
#   EXCEPTIONS
#
    
# EXCEPTIONS -> ERROR DEFINITION
class PyError(Exception):
    terminate = True
    message = "An error was raised."
    def __init__(self, **kwargs):
        self.kwargs = kwargs
        display = self.message.format(**kwargs)
        super().__init__(display)
    
# EXCEPTIONS -> ERRORS
class CheckError(PyError):
    message = "PST {field} field did not match {pattern} or {values}, the provided value was: {value}"
class RegexMatchError(PyError):
    message = "Datatype {datatype} does not match to any known pattern"
class DatabaseConnectionError(PyError):
    message = "An error ocurred whilst trying to access database {name} with {user}@{host} with password: {password}"
class DatabaseQueryError(PyError):
    message = "An error ocurred whilst processing the arguments in the following query: {query}"
class EnvironmentVariableNotFoundError(PyError):
    message = "The environment variable {name} was not found."
class CurlError(PyError):
    message = "cURL faced an error."
class APIScriptNotFoundError(PyError):
    message = "API Script {name}.py was not found."
class ModuleNotFoundError(PyError):
    message = "Module of type {area} named {name} not found"
class IncorrectArgumentInputError(PyError):
    message = "The PST array provided does not match any valid relationship: {PST}"
class UnknownArgumentValueError(PyError):
    message = "The argument {argument} has an unknown value: {value}"
class FileNotReadableError(PyError):
    message = "The file {path} is not readable."
class UnknownHTMLpyCommandError(PyError):
    message = "Encountered unknown command: {command}"

#
#   INITIALIZATION
#

# INITIALIZATION -> DJANGO
# from django import conf as CONF
# from django.core import management as CORE_MANAGEMENT
# from django.core import wsgi as CORE_WSGI
# from django import http as HTTP
# from django import urls as URLS
# from django.views.decorators.csrf import csrf_exempt

# INITIALIZATION -> COMMON MODULES
import os
import sys
import importlib.util as util
import pathlib
# import json
# 
# 
# import threading
# from random import randint
# from secrets import token_hex
# 
# from re import DOTALL as dotall
# from re import Pattern as pattern
# 
# 
#
# 
# 


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