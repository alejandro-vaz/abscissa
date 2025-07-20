#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import sys
from fastapi import Request, HTTPException, APIRouter, Response
from fastapi.responses import JSONResponse
from contextvars import ContextVar
import fastapi
import asyncio
import aiomysql
from aiomysql import Connection

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: any) -> None:
    for variable in variables:
        print(f"DEBUG: {repr(variable)}", file=sys.stderr)

# FUNCTIONS -> ADD
def add(*extensions: str) -> str:
    code = []
    for extension in extensions:
        with open(f"{SUG.DIR}/extensions/{extension}.py", "r") as file: code.append(file.read())
    return "\n\n".join(code)


#
#   SELF
#

# SELF -> CLASS
class Self: pass