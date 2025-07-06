#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   FUNCTIONS
#

# FUNCTIONS -> COUNT TRUE
def count(*args: bool) -> int:
    return sum(map(bool, args))


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None: pass