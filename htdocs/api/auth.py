#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# INIT -> EXTENSIONS
from extensions.cryptography import *
from extensions.database import *
from extensions.post import *
from extensions.response import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
@csrf_exempt
def output(request: object) -> object:
    # FUNCTION -> SUPERGLOBALS
    SUG.THR.REQ = request
    SUG.THR.SID = SUG.THR.REQ.COOKIES.get('session')
    
    # FUNCTION -> ACTIVATION
    cryptography_init()
    database_init()
    post_init()
    response_init()
    
    # FUNCTION -> ARGUMENT CHECKS
    check("EMAIL")
    check("PASSWORD")
    check("USERNAME")
    
    # FUNCTION -> ARGUMENT RELATIONSHIP
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
    
    # FUNCTION -> TYPES OF QUERIES
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
                session = gensession()
                setsession(session, username)
                return set_response(result, session = session)
            else:
                result = False
                return set_response(result)
        else:
            hashpass = database_request(
                "SELECT hashpass FROM users WHERE username = ?",
                [
                    SUG.THR.PST["USERNAME"]
                ]
            )[0]["hashpass"]
            if decrypt(hashpass, SUG.THR.PST["PASSWORD"])  == SUG.THR.PST["USERNAME"]:
                result = True
                session = gensession()
                setsession(session, SUG.THR.PST["USERNAME"])
                return set_response(result, session = session)
            else:
                result = False
                return set_response(result)
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
        return set_response(result)
    else:
        result = database_validate()
        return set_response(result)