#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
def output(request: HttpRequest) -> HttpResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import Response; Response(request)
    from website.extensions import database; database.init()
    from website.extensions import random; random.init()
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["session"]["refresh"]): return SUG.REQ.RES.error(3)
    # DECLARATION -> QUERY
    Sid = random.session()
    SUG.REQ.RES.cookie(Sid)
    database.session(Sid, SUG.THR.UDT["Uid"])
    SUG.REQ.RES.write(True)
    return SUG.REQ.RES.get()