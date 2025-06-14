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
    response_init()
    
    # FUNCTION -> VALIDATE
    if not SUG.THR.DBV:
        result = False
        return set_response(result)
    
    # FUNCTION -> TYPES OF QUERIES
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
    return set_response(result)