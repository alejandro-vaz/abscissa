#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   HEX BASE
#

# HEX BASE -> ENCODE
def str2bin(string: str) -> bytes:
    return bytes.fromhex(string)

# HEX BASE -> DECODE
def bin2str(bin: bytes) -> str:
    return bin.hex().upper()


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None: pass