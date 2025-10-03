#
#   INITIALIZATION
#

# INITIALIZATION -> COMMON MODULES
import sys
import fastapi
import asyncio
import aiomysql
import typing
import pydantic
import datetime

# INITIALIZATION -> SUPERGLOBALS
import SUG


#
#   FUNCTIONS
#

# FUNCTIONS -> DEBUG
def debug(*variables: typing.Any) -> None:
    for variable in variables: print(f"DEBUG: {repr(variable)}", file=sys.stderr)

# FUNCTIONS -> HANDLER
def handler(
    requestModel: type(pydantic.BaseModel), 
    responseModel: type(pydantic.BaseModel), 
    extensions: list[typing.Any]
) -> typing.Callable[[fastapi.WebSocket], typing.Awaitable]:
    def decorator(output: typing.Callable[[pydantic.BaseModel, list[typing.Any]], typing.Awaitable]) -> typing.Awaitable:
        async def hand(socket: fastapi.WebSocket) -> None:
            try:
                await socket.accept()
                classes = await asyncio.gather(*[module.namespace().init(socket) for module in extensions])
                while True:
                    try: payload = requestModel(**await socket.receive_json())
                    except fastapi.WebSocketDisconnect: break
                    except: await socket.send_json(SUG.ERR[0]); continue
                    data = await output(
                        payload, 
                        classes
                    )
                    responseModel(**data)
                    await socket.send_json(data)
            except fastapi.WebSocketDisconnect: pass
        return hand
    return decorator


#
#   EXPORTS
#
__all__ = [
    "sys",
    "fastapi",
    "asyncio",
    "aiomysql",
    "typing",
    "pydantic",
    "datetime",
    "SUG"
]