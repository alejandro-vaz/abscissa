#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   FUNCTIONS
#

# FUNCTIONS -> ONE TRUE
def bool_1true(*args):
    return sum(map(bool, args)) == 1


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def bool_init() -> None:
    pass