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
    # DECLARATION -> QUERY
    SUG.REQ.RES.write(SUG.THR.DBV)
    return SUG.REQ.RES.get()