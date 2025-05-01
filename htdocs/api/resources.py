# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# SUPERGLOBALS
import SUG

# IMPORTS
from extensions.database import *
from extensions.post import *
from extensions.response import *

@csrf_exempt
def response(request):
    # REQUEST DEFINITION
    SUG.THR.REQ = request
    
    # LOAD EXTENSIONS
    database_init()
    post_init()
    response_init()
    
    # CHECK ARGUMENTS
    check("LANG")
    check("RESOURCE")
    check("NODE")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if not isx("LANG"):
        raise Error()
    if isx("RESOURCE") and (isx("NODE") or isx("CONTEXT")):
        raise Error()
    if not isx("RESOURCE") and not isx("NODE") and not isx("CONTEXT"):
        raise Error()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # TYPES OF QUERIES
    if isx("RESOURCE"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE resource = ? AND lang = ?",
            [
                SUG.THR.PST["RESOURCE"],
                SUG.THR.PST["LANG"]
            ]
        )[0]
    elif isx("NODE") and isx("CONTEXT"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE node = ? AND lang = ? AND type = ?",
            [
                SUG.THR.PST["NODE"],
                SUG.THR.PST["LANG"],
                SUG.THR.PST["CONTEXT"]
            ]
        )
    elif isx("NODE") and not isx("CONTEXT"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE node = ? AND lang = ?",
            [
                SUG.THR.PST["NODE"],
                SUG.THR.PST["LANG"]
            ]
        )
    elif isx("CONTEXT") and not isx("NODE"):
        result = database_request(
            database,
            "SELECT * FROM resources WHERE type = ? AND lang = ?",
            [
                SUG.THR.PST["CONTEXT"],
                SUG.THR.PST["LANG"]
            ]
        )
    else:
        raise Error()
    
    # CRAFT RESPONSE
    response = craftResponse(result)
    
    # RETURN RESPONSE
    return response