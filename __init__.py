#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import sys
from fastapi import Request, HTTPException, APIRouter, Response, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, StreamingResponse
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

# FUNCTIONS -> HANDLER
def handler(requestModel: Any, responseModel: Any, extensions: list[Any]) -> Any:
    def decorator(output: Any) -> Any:
        async def hand(socket: WebSocket) -> None:
            await socket.accept()
            classList = await asyncio.gather(*[module.namespace().init(socket) for module in extensions])
            try:
                while True:
                    try: payload = requestModel(**await socket.receive_json())
                    except WebSocketDisconnect as error: raise error
                    except: await socket.send_json(SUG.ERR[0]); continue
                    data = await output(payload, classList)
                    responseModel(**data)
                    await socket.send_json(data)
            except WebSocketDisconnect: pass
            except Exception as error: raise error
        return hand
    return decorator