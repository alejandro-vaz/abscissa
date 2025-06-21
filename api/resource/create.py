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
    if not post.checks("Kid", "Rlang", "Rvideo", "Rlink"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Kid") and post.exists("Rlang") and post.exists("Rvideo") and post.exists("Rlink")): return SUG.REQ.RES.error(2)
    
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["resource"]["create"]): return SUG.REQ.RES.error(3)
    
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "INSERT INTO RESOURCES (Kid, Rlang, Rvideo, Rlink) VALUES (?, ?, ?, ?)",
        [
            SUG.REQ.PST["Kid"],
            SUG.REQ.PST["Rlang"],
            SUG.REQ.PST["Rvideo"],
            SUG.REQ.RES["Rlink"]
        ]
    ))
    return SUG.REQ.RES.get()