#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from website import *


#
#   RESPONSE
#

# RESPONSE -> MODULES
import datetime
import json

# RESPONSE -> CLASS
class namespace:
    # CLASS -> VARIABLES
    data: dict | int | float | str | bool | list | None
    # CLASS -> INIT
    async def init(self, request: Request) -> namespace: return self
    # CLASS -> LOAD
    def load(self, data: dict | int | float | str | bool | list | None) -> None:
        if isinstance(data, dict):
            for key, value in data.items():
                data[key] = self.convert(value)
        if isinstance(data, list):
            for index in range(len(data)):
                data[index] = self.convert(data[index])
        self.data = data
    # CLASS -> CONVERT
    def convert(self, value: Any) -> dict | int | float | str | bool | list | None:
        match value:
            case datetime.datetime(): return value.isoformat()
            case bytes(): return value.hex().upper()
            case _: return value
    # CLASS -> TO JSON
    def tojson(self, *keys: str) -> None:
        if isinstance(self.data, dict):
            for key in [key for key in keys if key in self.data]: self.data[key] = json.loads(self.data[key])
    # CLASS -> GET RESPONSE
    def get(self) -> JSONResponse: return JSONResponse(content = self.data)