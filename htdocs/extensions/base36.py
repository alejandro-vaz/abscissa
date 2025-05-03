#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   BASE 36
#

# BASE 36 -> ENCODE
def b36encode(num: int, pad: int) -> str:
    alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if num < 0:
        return '-' + b36encode(-num, pad)
    if num == 0:
        done = "0"
    else:
        digits = []
        while num:
            num, rem = divmod(num, 36)
            digits.append(alphabet[rem])
        done = ''.join(digits[::-1])
    while len(done) < pad:
        done = "0" + done
    return done

# BASE 36 -> DECODE
def b36decode(string: str) -> int:
    return int(string, 36)


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def base36_init() -> None:
    pass