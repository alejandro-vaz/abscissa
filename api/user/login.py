#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
def output(request: object) -> object:
    # DECLARATION -> EXTENSIONS
    from extensions import _
    _.__init__(request)
    from extensions import database, post, random
    
    # DECLARATION -> ARGUMENT CHECKS    
    if not post.checks("Uemail", "Uhashpass", "Uname"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Uhashpass") and (post.exists("Uemail") ^ post.exists("Uname"))): return SUG.REQ.RES.error(2)
    
    # DECLARATION -> QUERY
    key = "Uemail" if post.exists("Uemail") else "Uname"
    Uid, Uhashpass = database.request(
        "SELECT Uid, Uhashpass FROM USERS WHERE ! = ?",
        [
            key,
            SUG.REQ.PST[key]
        ]
    )[0]
    result = Uhashpass == SUG.REQ.PST["Uhashpass"]
    SUG.REQ.RES.write(result)
    if result:
        Sid = random.session()
        SUG.REQ.RES.cookie(Sid)
        database.session(Sid, Uid)
    return SUG.REQ.RES.get()