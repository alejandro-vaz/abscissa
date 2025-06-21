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
    from extensions import database
    
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["user"]["delete"]): return SUG.REQ.RES.error(3)
    
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "DELETE FROM USERS WHERE Uid = ?",
        [
            SUG.THR.UDT["Uid"]
        ]
    ))
    return SUG.REQ.RES.get()