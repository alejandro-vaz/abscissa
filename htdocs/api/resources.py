# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORTS
from extensions.check import *
from extensions.database import *
from extensions.response import *

@csrf_exempt
def response(request):
    # GET THE INPUT
    PST = getPOST(request)
    
    # CHECK ARGUMENTS
    check(PST, "LANG")
    check(PST, "RESOURCE")
    check(PST, "NODE")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if not isx(PST, "LANG"):
        raise Error()
    if isx(PST, "RESOURCE") and (isx(PST, "NODE") or isx(PST, "CONTEXT")):
        raise Error()
    if not isx(PST, "RESOURCE") and not isx(PST, "NODE") and not isx(PST, "CONTEXT"):
        raise Error()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # TYPES OF QUERIES
    if isx(PST, "RESOURCE"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE resource = ? AND lang = ?",
            [
                PST["RESOURCE"],
                PST["LANG"]
            ]
        )[0]
    elif isx(PST, "NODE") and isx(PST, "CONTEXT"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE node = ? AND lang = ? AND type = ?",
            [
                PST["NODE"],
                PST["LANG"],
                PST["CONTEXT"]
            ]
        )
    elif isx(PST, "NODE") and not isx(PST, "CONTEXT"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE node = ? AND lang = ?",
            [
                PST["NODE"],
                PST["LANG"]
            ]
        )
    elif isx(PST, "CONTEXT") and not isx(PST, "NODE"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE type = ? AND lang = ?",
            [
                PST["CONTEXT"],
                PST["LANG"]
            ]
        )
    else:
        raise Error()
    
    # CRAFT RESPONSE
    response = craftResponse(result)
    
    # RETURN RESPONSE
    return response