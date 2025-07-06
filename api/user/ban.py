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
    from website.extensions import post; post.init()
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Uid"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Uid"): return SUG.REQ.RES.error(2)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["user"]["ban"]): return SUG.REQ.RES.error(3)
    # DECLARATION -> QUERY
    if SUG.REQ.PST["Uid"] != SUG.THR.UDT["Uid"]:
        result = database.request(
            "DELETE FROM USERS WHERE Uid = ?",
            [
                SUG.REQ.PST["Uid"]
            ]
        )
    else:
        result = False
    SUG.REQ.RES.write(result)
    return SUG.REQ.RES.get()