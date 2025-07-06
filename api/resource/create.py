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
    if not post.checks("Kid", "Rlang", "Rvideo", "Rlink"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Kid", "Rlang", "Rvideo", "Rlink") == [True, True, True, True]): return SUG.REQ.RES.error(2)
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