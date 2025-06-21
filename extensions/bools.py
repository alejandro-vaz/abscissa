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

# FUNCTIONS -> COUNT TRUE
def count(*args: bool) -> int:
    return sum(map(bool, args))