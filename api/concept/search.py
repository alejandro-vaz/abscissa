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
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Ken", "Kes", "Kde"): return SUG.REQ.RES.error(1)
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not bools.count(*post.exists("Ken", "Kes", "Kde")) == 1: return SUG.REQ.RES.error(2)
    # DECLARATION -> QUERY
    string = next(lang for lang in ["Ken", "Kes", "Kde"] if post.exists(lang))
    SUG.REQ.RES.write(database.request(
        f"SELECT * FROM CONCEPTS WHERE {string} LIKE ?",
        [
            "%" + SUG.REQ.PST[string.split(" ")[0]] + "%"
        ]
    ))
    return SUG.REQ.RES.get()