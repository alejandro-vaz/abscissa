#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   CRAFT RESPONSE
#

# CRAFT RESPONSE -> FUNCTION
def set_response(jsonData: object, session: str = None) -> object:
    response = HTTP.JsonResponse(jsonData, status=200, safe=False)
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    if session and len(session) == 32:
        response.set_cookie(
            'session',
            session,
            max_age=72000,
            path='/',
            secure=True,
            httponly=True,
            samesite='Lax'
        )
    return response


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def response_init() -> None:
    pass