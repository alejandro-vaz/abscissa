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
    if not post.checks("Uemail", "Uhashpass", "Uname"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Uemail", "Uhashpass", "Uname") == [True, True, True]): return SUG.REQ.RES.error(2)
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass, Ujoined, Uplayground, Usettings, Oid, Urole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            SUG.REQ.PST["Uname"],
            SUG.REQ.PST["Uemail"],
            SUG.REQ.PST["Uhashpass"],
            time.now(),
            {},
            {},
            0,
            0
        ]
    ))
    return SUG.REQ.RES.get()