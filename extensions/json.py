#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
import __init__ as æ


#
#   JSON
#

# JSON -> MODULES
from json import loads

# JSON -> CLASS
class namespace:
    # CLASS -> INIT
    async def init(self, socket: æ.WebSocket) -> namespace: return self
    # CLASS -> CONVERT
    def parse(self, data: dict, keys: list[str]) -> None:
        try: 
            for key in [key for key in keys if key in data and isinstance(data[key], str)]: data[key] = loads(data[key])
        except: raise æ.HTTPException(**æ.SUG.ERR[2])