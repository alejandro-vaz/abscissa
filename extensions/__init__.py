#
#   HANDLER
#

# HANDLER -> LOAD
from website import *

# HANDLER -> MODULES
import json


#
#   RESPONSE
#

# RESPONSE -> CLASS
class Response:
    data: dict | list | bool | str | int | None
    Sid: bytes
    def __init__(self, request: HttpRequest) -> None:
        SUG.REQ.SID = bytes.fromhex(request.COOKIES.get('Sid')) if bool(request.COOKIES.get('Sid')) else None
        SUG.REQ.SIP = request.META.get('REMOTE_ADDR')
        SUG.REQ.PST = json.loads(request.body) if bool(request.body) else None
        SUG.REQ.RES = self
        self.data = None
        self.Sid = None
    def cookie(self, cookie: bytes) -> None:
        self.Sid = cookie
    def write(self, content: dict | list | bool | str | int | None) -> None:
        self.data = content
    def error(self, number: int) -> HttpResponse:
        response = JsonResponse(
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
    def get(self) -> HttpResponse:
        response = JsonResponse(
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