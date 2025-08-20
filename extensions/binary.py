#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from website import *


#
#   BINARY
#

# BINARY -> CLASS
class namespace:
    # CLASS -> VARIABLES
    data: bytes
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> namespace: return self
    # CLASS -> LOAD
    def load(self, data: bytes) -> None:
        self.data = data
    # CLASS -> SERIALIZE
    def toStr(self, data: bytes) -> str:
        return data.hex().upper()
    # CLASS -> DESERIALIZE
    def toBytes(self, data: str) -> bytes:
        return bytes.fromhex(data)
    # CLASS -> GET
    def get(self) -> StreamingResponse:
        def iterator() -> object:
            size = 8192
            for index in range(0, len(self.data), size):
                yield self.data[index:index+size]
        return StreamingResponse(iterator(), media_type = "application/wasm")