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
def gensession() -> str:
    return secrets.token_hex(16)

# FUNCTIONS -> RANDOM INTEGER
def randomint(lower, upper) -> int:
    return random.randint(lower, upper)


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def random_init() -> None:
    pass