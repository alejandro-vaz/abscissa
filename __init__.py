#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import sys
from fastapi import Request, HTTPException, APIRouter, Response
from fastapi.responses import JSONResponse, StreamingResponse
from contextvars import ContextVar
import fastapi
import asyncio
import aiomysql
from aiomysql import Connection
from typing import Any

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: Any) -> None:
    for variable in variables:
        print(f"DEBUG: {repr(variable)}", file=sys.stderr)

# FUNCTIONS -> ADD
def add(*extensions: str) -> str:
    code = []
    for extension in extensions:
        with open(f"{SUG.DIR}/extensions/{extension}.py", "r") as file: code.append(file.read())
    return "\n\n".join(code)

# FUNCTIONS -> SAFE ACCESS
def º(array: list | dict, key: int | str) -> Any:
    match array:
        case dict(): return array[key] if key in array else None
        case list(): return array[int(key)] if int(key) < len(array) else None