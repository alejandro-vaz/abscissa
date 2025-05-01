# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORTS
from extensions.database import *
from extensions.response import *

@csrf_exempt
def response(request):
    # REQUEST DEFINITION
    SUG.THR.REQ = request
    SUG.THR.SID = SUG.THR.REQ.COOKIES.get('session')
    
    # LOAD EXTENSIONS
    database_init()
    response_init()
    
    # VALIDATE ACCESS
    if not database_validate():
        raise Error()
    
    # TYPES OF QUERIES
    if True:
        result = database_request(
            "SELECT * FROM users WHERE username = ?",
            [
                database_request(
                    "SELECT username FROM sessions WHERE session = ?",
                    [
                        request.COOKIES.get('session')
                    ]
                )[0]['username']
            ]
        )[0]
        
    response = craftResponse(result)
    return response