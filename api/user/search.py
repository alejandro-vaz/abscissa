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
    if not post.checks("Uname"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Uname"): return SUG.REQ.RES.error(2)
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        f"SELECT Uid, Uname, Ujoined, Urole FROM USERS WHERE Uname LIKE ?",
        [
            "%" + SUG.REQ.PST["Uname"] + "%"
        ]
    ))
    return SUG.REQ.RES.get()