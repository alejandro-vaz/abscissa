#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> DECLARATION
@router.post("/api/user/lookup")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database, post
    await asyncio.gather(
        database.init(request, response),
        post.init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks: raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Uname"): raise SUG.ERR[1]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "SELECT Uname, Ujoined, Oid, Urole FROM USERS WHERE Uname = ?",
        [
            post.data["Uname"]
        ]
    ))