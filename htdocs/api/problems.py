#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# INIT -> EXTENSIONS
from extensions.cryptography import *
from extensions.database import *
from extensions.post import *
from extensions.response import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
@csrf_exempt
def response(request: object) -> object:
    # FUNCTION -> SUPERGLOBALS
    SUG.THR.REQ = request
    SUG.THR.SID = SUG.THR.REQ.COOKIES.get('session')
    
    # FUNCTION -> ACTIVATION
    cryptography_init()
    database_init()
    post_init()
    response_init()
    
    # FUNCTION -> ARGUMENT CHECKS
    check("LANG")
    check("PROBLEM")
    check("NODE")
    
    # FUNCTION -> ARGUMENT RELATIONSHIP
    if not isx("LANG"):
        raise TabError()
    if isx("NODE") and isx("PROBLEM"):
        raise TabError()
    if isx("CONTEXT") and (isx("PROBLEM") or isx("NODE")):
        raise TabError()
    if not isx("CONTEXT") and not isx("PROBLEM") and  not isx("NODE"):
        raise TabError()
    
    # FUNCTION -> TYPES OF QUERIES
    if isx("PROBLEM"):
        result = database_request(
            "SELECT * FROM problems WHERE problem = ? AND ? IS NOT NULL",
            [
                SUG.THR.PST["PROBLEM"],
                "data_" + SUG.THR.PST["LANG"]
            ]
        )[0]
    elif isx("NODE"):
        result = database_request(
            "SELECT * FROM problems WHERE node = ? AND ? IS NOT NULL",
            [
                SUG.THR.PST["NODE"],
                "data_" + SUG.THR.PST["LANG"]
            ]
        )
    elif isx("CONTEXT"):
        if SUG.THR.PST["CONTEXT"] == "day":
            result = database_request(
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    crc32date() % int(database_request(
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]["total"])
                ]
            )[0]
        elif SUG.THR.PST["CONTEXT"] == "random":
            result = database_request(
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    randint(0, int(database_request(
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]['total']) - 1)
                ]
            )[0]
        else:
            raise TabError()
    else:
        raise TabError()
    response = craftResponse(result)
    return response