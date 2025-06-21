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
    from extensions import database, random
    
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["session"]["refresh"]): return SUG.REQ.RES.error(3)
    
    # DECLARATION -> QUERY
    Sid = random.session()
    SUG.REQ.RES.cookie(Sid)
    database.session(Sid, SUG.THR.UDT["Uid"])
    SUG.REQ.RES.write(True)
    return SUG.REQ.RES.get()