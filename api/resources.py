#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> EXTENSIONS
from extensions.database import *
from extensions.post import *
from extensions.response import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
def output(request: object) -> object:
    # FUNCTION -> SUPERGLOBALS
    SUG.THR.REQ = request
    
    # FUNCTION -> ACTIVATION
    database_init()
    post_init()
    response_init()
    
    # FUNCTION -> ARGUMENT CHECKS
    check("CONTEXT", values = ["video"])
    check("LANG", values = SUG.LAN)
    check("NODE")
    check("RESOURCE")
    
    # FUNCTION -> ARGUMENT RELATIONSHIP
    if not isx("LANG"):
        raise IncorrectArgumentInputError(PST = SUG.THR.PST)
    if isx("RESOURCE") and (isx("NODE") or isx("CONTEXT")):
        raise IncorrectArgumentInputError(PST = SUG.THR.PST)
    if not isx("RESOURCE") and not isx("NODE") and not isx("CONTEXT"):
        raise IncorrectArgumentInputError(PST = SUG.THR.PST)
    
    # FUNCTION -> TYPES OF QUERIES
    if isx("RESOURCE"):
        result = database_request(
            "SELECT * FROM resources WHERE resource = ? AND lang = ?",
            [
                SUG.THR.PST["RESOURCE"],
                SUG.THR.PST["LANG"]
            ]
        )[0]
    elif isx("NODE") and isx("CONTEXT"):
        result = database_request(
            "SELECT * FROM resources WHERE node = ? AND lang = ? AND type = ?",
            [
                SUG.THR.PST["NODE"],
                SUG.THR.PST["LANG"],
                SUG.THR.PST["CONTEXT"]
            ]
        )
    elif isx("NODE") and not isx("CONTEXT"):
        result = database_request(
            "SELECT * FROM resources WHERE node = ? AND lang = ?",
            [
                SUG.THR.PST["NODE"],
                SUG.THR.PST["LANG"]
            ]
        )
    else:
        result = database_request(
            "SELECT * FROM resources WHERE type = ? AND lang = ?",
            [
                SUG.THR.PST["CONTEXT"],
                SUG.THR.PST["LANG"]
            ]
        )
    return set_response(result)