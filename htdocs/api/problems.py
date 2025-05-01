# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# SUPERGLOBALS
import SUG

# IMPORTS
from extensions.cryptography import *
from extensions.database import *
from extensions.post import *
from extensions.response import *

@csrf_exempt
def response(request):
    # REQUEST DEFINITION
    SUG.THR.REQ = request
    
    # LOAD EXTENSIONS
    cryptography_init()
    database_init()
    post_init()
    response_init()
    
    # CHECK ARGUMENTS
    check("LANG")
    check("PROBLEM")
    check("NODE")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if not isx("LANG"):
        raise TabError()
    if isx("NODE") and isx("PROBLEM"):
        raise TabError()
    if isx("CONTEXT") and (isx("PROBLEM") or isx("NODE")):
        raise TabError()
    if not isx("CONTEXT") and not isx("PROBLEM") and  not isx("NODE"):
        raise TabError()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # TYPES OF QUERIES
    if isx("PROBLEM"):
        result = database_request(
            database,
            "SELECT * FROM problems WHERE problem = ? AND ? IS NOT NULL",
            [
                SUG.THR.PST["PROBLEM"],
                "data_" + SUG.THR.PST["LANG"]
            ]
        )[0]
    elif isx("NODE"):
        result = database_request(
            database,
            "SELECT * FROM problems WHERE node = ? AND ? IS NOT NULL",
            [
                SUG.THR.PST["NODE"],
                "data_" + SUG.THR.PST["LANG"]
            ]
        )
    elif isx("CONTEXT"):
        if SUG.THR.PST["CONTEXT"] == "day":
            result = database_request(
                database,
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    crc32date() % int(database_request(
                        database,
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]["total"])
                ]
            )[0]
        elif SUG.THR.PST["CONTEXT"] == "random":
            result = database_request(
                database,
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    randint(0, int(database_request(
                        database,
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]['total']) - 1)
                ]
            )[0]
        else:
            raise TabError(SUG.THR.PST)
    else:
        raise TabError()
        
    # CRAFT RESPONSE
    response = craftResponse(result)
    
    # RETURN RESPONSE
    return response