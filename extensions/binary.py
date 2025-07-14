#
#   BINARY
#

# BINARY -> NAMESPACE
binary = ContextVar("binary")

# BINARY -> CLASS
class _binary:
    # CLASS -> CREATION
    def __init__(self) -> None: binary.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None: pass
    # CLASS -> STRING TO BYTES
    def str2bin(self, hexadecimal: str) -> bytes:
        return bytes.fromhex(hexadecimal)
    # CLASS -> BYTES TO STRING
    def bin2str(self, bytecode: bytes) -> str:
        return bytecode.hex().upper()

# BINARY -> INIT
_binary()