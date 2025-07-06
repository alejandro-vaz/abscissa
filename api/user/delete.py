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