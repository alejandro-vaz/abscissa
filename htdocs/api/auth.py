# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# EXTENSIONS
from extensions.cryptography import *
from extensions.database import *
from extensions.post import *
from extensions.response import *

@csrf_exempt
def response(request):
    # REQUEST DEFINITION
    SUG.THR.REQ = request
    SUG.THR.SID = SUG.THR.REQ.COOKIES.get('session')
    
    # LOAD EXTENSIONS
    cryptography_init()
    database_init()
    post_init()
    response_init()
    
    # CHECK ARGUMENTS
    check("EMAIL")
    check("PASSWORD")
    check("USERNAME")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if isx("CONTEXT"):
        if SUG.THR.PST["CONTEXT"] == "login":
            if not (isx("PASSWORD") and (isx("EMAIL") ^ isx("USERNAME"))):
                raise Error()
        elif SUG.THR.PST["CONTEXT"] == "register":
            if not (isx("EMAIL") and isx("USERNAME") and isx("PASSWORD")):
                raise Error()
        elif SUG.THR.PST["CONTEXT"] == 'validate':
            if isx("USERNAME") or isx("EMAIL") or isx("PASSWORD"):
                raise Error()
        else:
            raise Error()
    else:
        raise Error()
    
    # TYPES OF QUERIES
    if SUG.THR.PST["CONTEXT"] == 'login':
        if isx("EMAIL"):
            hashpass, username = database_request(
                "SELECT hashpass, username FROM users WHERE email = ?",
                [
                    SUG.THR.PST["EMAIL"]
                ]
            )[0]
            if decrypt(hashpass, SUG.THR.PST["PASSWORD"]) == username:
                result = True
                # CRAFT RESPONSE
                response = craftResponse(result)
                session = gensession()
                setsession(response, session, username)
            else:
                result = False
                # CRAFT RESPONSE
                response = craftResponse(result)
            return response
        else:
            hashpass = database_request(
                "SELECT hashpass FROM users WHERE username = ?",
                [
                    SUG.THR.PST["USERNAME"]
                ]
            )[0]["hashpass"]
            if decrypt(hashpass, SUG.THR.PST["PASSWORD"])  == SUG.THR.PST["USERNAME"]:
                result = True
                # CRAFT RESPONSE
                response = craftResponse(result)
                session = gensession()
                setsession(response, session, SUG.THR.PST["USERNAME"])
            else:
                result = False
                # CRAFT RESPONSE
                response = craftResponse(result)
            return response
    if SUG.THR.PST["CONTEXT"] == "register":
        result = database_request(
            "INSERT INTO users (username, joined, email, hashpass, preferences, role) VALUES (?, ?, ?, ?, ?, ?)",
            [
                SUG.THR.PST["USERNAME"],
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                SUG.THR.PST["EMAIL"],
                encrypt(SUG.THR.PST["USERNAME"], SUG.THR.PST["PASSWORD"]),
                json.dumps([]),
                0
            ]
        )
        response = craftResponse(result)
        return response
    else:
        result = database_validate()
        response = craftResponse(result)
        return response