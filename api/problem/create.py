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
    from website.extensions import time; time.init()
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Kid", "Pmeta", "Psolution", "Pdataen", "Pdataes", "Pdatade"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Kid", "Pmeta", "Psolution", "Pdataen") == [True, True, True, True]): return SUG.REQ.RES.error(2)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (SUG.THR.DBV and SUG.THR.UDT["Urole"] >= SUG.PER["problem"]["create"]): return SUG.REQ.RES.error(3)
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "INSERT INTO PROBLEMS (Uid, Kid, Pedited, Pmeta, Psolution, Pdataen, Pdataes, Pdatade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            SUG.THR.UDT["Uid"],
            SUG.REQ.PST["Kid"],
            time.now(),
            SUG.REQ.PST["Pmeta"],
            SUG.REQ.PST["Psolution"],
            SUG.REQ.PST["Pdataen"],
            SUG.REQ.PST["Pdataes"] if SUG.REQ.PST["Pdataen"] else None,
            SUG.REQ.PST["Pdatade"] if SUG.REQ.PST["Pdatade"] else None
        ]
    ))
    return SUG.REQ.RES.get()