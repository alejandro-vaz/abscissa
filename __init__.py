#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import os
import sys
import pathlib
from fastapi import Request, Depends, HTTPException, status, APIRouter, Response
from fastapi.responses import JSONResponse
from contextvars import ContextVar
import fastapi
import re
import asyncio
import aiomysql
from aiomysql import Connection

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: object):
    for variable in variables:
        print(f"DEBUG: {repr(variable)}", file=sys.stderr)

# FUNCTIONS -> ADD
def add(*extensions: str) -> str:
    code = []
    for extension in extensions:
        with open(f"/srv/www/website/extensions/{extension}.py", "r") as file: code.append(file.read())
    return "\n\n".join(code)