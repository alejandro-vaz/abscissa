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

# FUNCTIONS -> HANDLER
def handler(requestModel: Any, responseModel: Any, extensions: list[Any]) -> Any:
    def decorator(output: Any) -> Any:
        async def hand(socket: WebSocket) -> None:
            await socket.accept()
            try:
                while True:
                    try: payload = requestModel(**await socket.receive_json())
                    except WebSocketDisconnect: break
                    except: await socket.send_json(SUG.ERR[0]); continue
                    data = await output(
                        payload, 
                        await asyncio.gather(*[module.namespace().init(socket) for module in extensions])
                    )
                    responseModel(**data)
                    await socket.send_json(data)
            except WebSocketDisconnect: pass
        return hand
    return decorator