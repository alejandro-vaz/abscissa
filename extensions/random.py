#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> MODULES
import random
import secrets


#
#   FUNCTIONS
#

# FUNCTIONS -> GENERATE SESSION
def session() -> bytes:
    return secrets.token_bytes(32)

# FUNCTIONS -> RANDOM INTEGER
def integer(lower: int, upper: int) -> int:
    return random.randint(lower, upper)