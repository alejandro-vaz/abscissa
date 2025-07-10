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
@router.post("/api/organisation/search")
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
    if not post.exists("Oname"): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "SELECT Oname FROM ORGANISATIONS WHERE Oname LIKE ?",
        [
            "%" + post.data["Oname"] + "%"
        ]
    ))