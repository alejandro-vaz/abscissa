#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   HEX BASE
#

# HEX BASE -> ENCODE
def str2bin(string: str) -> bytes:
    return bytes.fromhex(string)

# HEX BASE -> DECODE
def bin2str(data: bytes) -> str:
    return data.hex().upper()