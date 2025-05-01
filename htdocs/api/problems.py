# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORTS
from extensions.check import *
from extensions.cryptography import *
from extensions.database import *
from extensions.response import *

@csrf_exempt
def response(request):
    # GET THE INPUT
    PST = getPOST(request)
    
    # CHECK ARGUMENTS
    check(PST, "LANG")
    check(PST, "PROBLEM")
    check(PST, "NODE")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if not isx(PST, "LANG"):
        raise TabError()
    if isx(PST, "NODE") and isx(PST, "PROBLEM"):
        raise TabError()
    if isx(PST, "CONTEXT") and (isx(PST, "PROBLEM") or isx(PST, "NODE")):
        raise TabError()
    if not isx(PST, "CONTEXT") and not isx(PST, "PROBLEM") and  not isx(PST, "NODE"):
        raise TabError()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # TYPES OF QUERIES
    if isx(PST, "PROBLEM"):
        result = database_request(
            database,
            "SELECT * FROM problems WHERE problem = ? AND ? IS NOT NULL",
            [
                PST["PROBLEM"],
                "data_" + PST["LANG"]
            ]
        )[0]
    elif isx(PST, "NODE"):
        result = database_request(
            database,
            "SELECT * FROM problems WHERE node = ? AND ? IS NOT NULL",
            [
                PST["NODE"],
                "data_" + PST["LANG"]
            ]
        )
    elif isx(PST, "CONTEXT"):
        if PST["CONTEXT"] == "day":
            result = database_request(
                database,
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + PST["LANG"],
                    crc32date() % int(database_request(
                        database,
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + PST["LANG"]
                        ]
                    )[0]["total"])
                ]
            )[0]
        elif PST["CONTEXT"] == "random":
            result = database_request(
                database,
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + PST["LANG"],
                    randint(0, int(database_request(
                        database,
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + PST["LANG"]
                        ]
                    )[0]['total']) - 1)
                ]
            )[0]
        else:
            raise TabError()
    else:
        raise TabError()
        
    # CRAFT RESPONSE
    response = craftResponse(result)
    
    # RETURN RESPONSE
    return response