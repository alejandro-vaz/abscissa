#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> MODULES
import json


#
#   RESPONSE
#

# RESPONSE -> CLASS
class Response():
    def __init__(self: object) -> None:
        self.data = {}
        self.Sid = None
    def cookie(self: object, cookie: bytes) -> None:
        self.Sid = cookie
    def write(self: object, content: object) -> None:
        self.data = content
    def error(self: object, number: int) -> object:
        response = http.JsonResponse(
            {"error": number},
            status = SUG.ERR[number],
            safe = False
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        if self.Sid:
            response.set_cookie(
                'Sid',
                self.Sid.hex().upper(),
                max_age = 604800,
                path = "/",
                secure = True,
                httponly = True,
                samesite = 'Lax'
            )
        return response
    def get(self: object) -> object:
        response = http.JsonResponse(
            self.data, 
            status = 200, 
            safe = False
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        if self.Sid:
            response.set_cookie(
                'Sid',
                self.Sid.hex().upper(),
                max_age = 604800,
                path = "/",
                secure = True,
                httponly = True,
                samesite = 'Lax'
            )
        return response


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def __init__(request: object) -> None:
    SUG.REQ.SID = bytes.fromhex(request.COOKIES.get('Sid')) if bool(request.COOKIES.get('Sid')) else None
    SUG.REQ.SIP = request.META.get('REMOTE_ADDR')
    SUG.REQ.PST = json.loads(request.body) if bool(request.body) else None
    SUG.REQ.RES = Response()