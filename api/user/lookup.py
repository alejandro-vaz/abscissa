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
    from extensions import database, post
    
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Uid"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Uid"): return SUG.REQ.RES.error(2)
    
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "SELECT Uid, Uname, Ujoined, Oid, Urole FROM USERS WHERE Uid = ?",
        [
            SUG.REQ.PST["Uid"]
        ]
    )[0])
    return SUG.REQ.RES.get()