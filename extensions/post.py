#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   PST
#

# PST -> KEY EXISTS
def exists(key: str) -> bool:
    if isinstance(SUG.REQ.PST, dict):
        return key in SUG.REQ.PST
    return False

# PST -> CHECKS
def checks(*keys: str) -> bool:
    for key in keys:
        if exists(key):
            if not re.compile(SUG.PAT[key]).fullmatch(str(SUG.REQ.PST[key])):
                return False
    return True