#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   HELPERS
#

# HELPERS -> REGEX PATTERN
def regex(datatype: str) -> object:
    match (datatype):
        case "PROBLEM": return compile(r'^[A-Z0-9]{6}$')
        case "NODE": return compile(r'^[A-Z0-9]{4}$')
        case "CLUSTER": return compile(r'^[A-Z0-9]{2}$')
        case "TREE": return compile(r'^[A-Z0-9]{1}$')
        case "EMAIL": return compile(r'^[A-Za-z0-9._%\-]+@gmail\.com$')
        case "PASSWORD": return compile(r'^[a-zA-Z0-9_!@#$%^&*()\-=+.]{8,32}$')
        case "USERNAME": return compile(r'^[a-zA-Z0-9_-]{4,32}$')
        case "LANG": return compile(r'^[a-z]{2}$')
        case "RESOURCE": return compile(r'^(?:[1-9][0-9]{0,7})$')
        case "CONTEXT": return compile(r'.*')
        case _: raise RegexMatchError(datatype)


#
#   PST
#

# PST -> KEY EXISTS
def isx(key: str) -> bool:
    if type(SUG.THR.PST) == dict:
        return key in SUG.THR.PST
    return False

# PST -> KEY MATCHES PATTERN
def check(key: str, values: list = [], strict: bool = True) -> object:
    if isx(key):
        value = str(SUG.THR.PST[key])
        if not regex(key).fullmatch(value):
            if strict:
                raise CheckError(key, regex(key), values, SUG.THR.PST[key])
            else:
                return False
        else:
            if len(values) > 0:
                if strict:
                    if not SUG.THR.PST[key] in values:
                        raise UnknownArgumentValueError(key, SUG.THR.PST[key])
                else:
                    return SUG.THR.PST[key] in values
            else:
                if not strict:
                    return True
    else:
        if not strict:
            return True


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def post_init() -> None:
    SUG.THR.PST = json.loads(SUG.THR.REQ.body)