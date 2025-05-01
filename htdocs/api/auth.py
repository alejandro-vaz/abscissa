# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORTS
from extensions.check import *
from extensions.cryptography import *
from extensions.database import *
from extensions.response import *

@csrf_exempt
def response(request):
    # GET THE INPUT
    PST = getPOST(request)
    
    # CHECK ARGUMENTS
    check(PST, "EMAIL")
    check(PST, "PASSWORD")
    check(PST, "USERNAME")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if isx(PST, "CONTEXT"):
        if PST["CONTEXT"] == "login":
            if not (isx(PST, "PASSWORD") and (isx(PST, "EMAIL") ^ isx(PST, "USERNAME"))):
                raise Error()
        elif PST["CONTEXT"] == "register":
            if not (isx(PST, "EMAIL") and isx(PST, "USERNAME") and isx(PST, "PASSWORD")):
                raise Error()
        elif PST["CONTEXT"] == 'validate':
            if isx(PST, "USERNAME") or isx(PST, "EMAIL") or isx(PST, "PASSWORD"):
                raise Error()
        else:
            raise Error()
    else:
        raise Error()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')
    
    # TYPES OF QUERIES
    if PST["CONTEXT"] == 'login':
        if isx(PST, "EMAIL"):
            hashpass, username = database_request(
                database,
                "SELECT hashpass, username FROM users WHERE email = ?",
                [
                    PST["EMAIL"]
                ]
            )[0]
            if decrypt(hashpass, PST["PASSWORD"]) == username:
                result = True
                # CRAFT RESPONSE
                response = craftResponse(result)
                session = gensession()
                setsession(request, response, session, database, username)
            else:
                result = False
                # CRAFT RESPONSE
                response = craftResponse(result)
            return response
        else:
            hashpass = database_request(
                database,
                "SELECT hashpass FROM users WHERE username = ?",
                [
                    PST["USERNAME"]
                ]
            )[0]["hashpass"]
            if decrypt(hashpass, PST["PASSWORD"])  == PST["USERNAME"]:
                result = True
                # CRAFT RESPONSE
                response = craftResponse(result)
                session = gensession()
                setsession(request, response, session, database, PST["USERNAME"])
            else:
                result = False
                # CRAFT RESPONSE
                response = craftResponse(result)
            return response
    if PST["CONTEXT"] == "register":
        result = database_request(
            database,
            "INSERT INTO users (username, joined, email, hashpass, preferences, role) VALUES (?, ?, ?, ?, ?, ?)",
            [
                PST["USERNAME"],
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                PST["EMAIL"],
                encrypt(PST["USERNAME"], PST["PASSWORD"]),
                json.dumps([]),
                0
            ]
        )
        response = craftResponse(result)
        return response
    else:
        result = database_validate(request, database)
        response = craftResponse(result)
        return response