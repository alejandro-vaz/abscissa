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
    if not post.checks("Oid"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Oid"): return SUG.REQ.RES.error(2)
    
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["organisation"]["join"]): return SUG.REQ.RES.error(3)
    
    # DECLARATION -> QUERY
    result = bool(database.request(
        "SELECT * FROM ORGANISATIONS WHERE Oid = ?",
        [
            SUG.REQ.PST["Oid"]
        ]
    ))
    SUG.REQ.RES.write(result)
    if result:
        database.request(
            "UPDATE USERS SET Oid = ? WHERE Uid = ?",
            [
                SUG.REQ.PST["Oid"],
                SUG.THR.UDT["Uid"]
            ]
        )
    return SUG.REQ.RES.get()