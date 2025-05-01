#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   CRAFT RESPONSE
#

# CRAFT RESPONSE -> FUNCTION
def craftResponse(jsonData: object) -> object:
    response = HTTP.JsonResponse(jsonData, status=200, safe=False)
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def response_init() -> None:
    pass