#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from abscissa import *


#
#   JSON
#

# JSON -> MODULES
from json import loads

# JSON -> CLASS
class namespace:
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> namespace: return self
    # CLASS -> CONVERT
    def parse(self, data: dict, keys: list[str]) -> None:
        for key in [key for key in keys if key in data and isinstance(data[key], str)]: data[key] = loads(data[key])