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
    async def init(self, request: Request) -> namespace: return self
    # CLASS -> LOAD
    def load(self, data: bytes | str) -> None:
        self.data = data if isinstance(data, bytes) else bytes.fromhex(data)
    # CLASS -> SERIALIZE
    def serialize(self) -> str:
        return self.data.hex().upper()
    # CLASS -> GET
    def get(self) -> StreamingResponse:
        def iterator() -> object:
            size = 8192
            for index in range(0, len(self.data), size):
                yield self.data[index:index+size]
        return StreamingResponse(iterator(), media_type = "application/wasm")