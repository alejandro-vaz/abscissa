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
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: Any) -> None:
    for variable in variables:
        print(f"DEBUG: {repr(variable)}", file=sys.stderr)

# FUNCTIONS -> SAFE ACCESS
def º(array: list | dict, *keys: int | str) -> Any:
    try:
        if len(keys) == 1:
            match array:
                case list(): return array[keys[0] if isinstance(keys[0], int) else 0]
                case dict(): return array[keys[0]]
        else: return º(º(array, keys[0]), *keys[1:])
    except: 
        raise HTTPException(**SUG.ERR[2])