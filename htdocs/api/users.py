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

    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # VALIDATE ACCESS
    if not database_validate(request, database):
        raise Error()
    
    # TYPES OF QUERIES
    if True:
        result = database_request(
            database,
            "SELECT * FROM users WHERE username = ?",
            [
                database_request(
                    database,
                    "SELECT username FROM sessions WHERE session = ?",
                    [
                        request.COOKIES.get('session')
                    ]
                )[0]['username']
            ]
        )[0]
        
    response = craftResponse(result)
    return response