#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   PST
#

# PST -> KEY EXISTS
def exists(*keys: str) -> bool | list:
    if len(keys) == 1:
        return keys[0] in SUG.REQ.PST
    else:
        values = []
        for key in keys:
            values.append(key in SUG.REQ.PST)
        return values

# PST -> CHECKS
def checks(*keys: str) -> bool:
    for key in keys:
        if exists(key):
            if isinstance(SUG.PAT[key], set):
                if not SUG.PAT[key].issubset(SUG.REQ.PST[key]): return False
            else:
                if not bool(re.compile(SUG.PAT[key]).fullmatch(str(SUG.REQ.PST[key]))): return False
    return True


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None: pass