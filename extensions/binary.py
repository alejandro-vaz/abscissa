#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
import __init__ as æ


#
#   BINARY
#

# BINARY -> CLASS
class namespace:
    # CLASS -> VARIABLES
    data: bytes
    # CLASS -> INIT
    async def init(self, socket: æ.WebSocket) -> namespace: return self
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
    def get(self) -> æ.StreamingResponse:
        def iterator():
            size = 8192
            for index in range(0, len(self.data), size):
                yield self.data[index:index+size]
        return æ.StreamingResponse(iterator(), media_type = "application/wasm")