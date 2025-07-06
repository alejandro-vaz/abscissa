#
#   HANDLER
#

# HANDLER -> LOAD
from website import *

# HANDLER -> MODULES
import random


#
#   FUNCTIONS
#

# FUNCTIONS -> GENERATE SESSION
def session() -> bytes:
    return secrets.token_bytes(32)

# FUNCTIONS -> RANDOM INTEGER
def integer(lower: int, upper: int) -> int:
    return random.randint(lower, upper)


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None: pass