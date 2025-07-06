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
    from website.extensions import bools; bools.init()
    from website.extensions import database; database.init()
    from website.extensions import post; post.init()
    from website.extensions import random; random.init()
    # DECLARATION -> ARGUMENT CHECKS    
    if not post.checks("Uhashpass", "Uname"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Uhashpass", "Uname") == [True, True]): return SUG.REQ.RES.error(2)
    # DECLARATION -> QUERY
    Uid, Uhashpass = database.request(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = ?",
        [
            SUG.REQ.PST["Uname"]
        ]
    )[0].values()
    debug(Uhashpass, SUG.REQ.PST["Uhashpass"], Uid, database.request(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = ?",
        [
            SUG.REQ.PST["Uname"]
        ]
    )[0])
    result = Uhashpass == SUG.REQ.PST["Uhashpass"]
    SUG.REQ.RES.write(result)
    if result:
        Sid = random.session()
        SUG.REQ.RES.cookie(Sid)
        database.session(Sid, Uid)
    return SUG.REQ.RES.get()