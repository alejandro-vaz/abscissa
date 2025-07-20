#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   BINARY
#

# BINARY -> CLASS
class namespace:
    # CLASS -> INIT
    async def init(self, request: Request) -> Self: return self
    # CLASS -> STRING TO BYTES
    def str2bin(self, hexadecimal: str) -> bytes:
        return bytes.fromhex(hexadecimal)
    # CLASS -> BYTES TO STRING
    def bin2str(self, bytecode: bytes) -> str:
        return bytecode.hex().upper()