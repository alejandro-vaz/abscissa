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
    if not post.checks("Kid", "Rlang", "Rvideo"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Kid", "Rlang", "Rvideo") == [True, True, True]): return SUG.REQ.RES.error(2)
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "SELECT * FROM RESOURCES WHERE Kid = ? AND Rlang = ? AND Rvideo = ?",
        [
            SUG.REQ.PST["Kid"],
            SUG.REQ.PST["Rlang"],
            SUG.REQ.PST["Rvideo"]
        ]
    ))
    return SUG.REQ.RES.get()