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
@router.post("/api/user/ban")
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
    if not post.exists("Uid"): raise SUG.ERR[1]
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["user"]["ban"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    result = False
    if post.data["Uid"] != database.user["Uid"] and await bool(database.request(
        "SELECT * FROM USERS WHERE Uid = ?",
        [
            post.data["Uid"]
        ]
    )):
        result = await database.request(
            "DELETE FROM USERS WHERE Uid = ?",
            [
                post.data["Uid"]
            ]
        )
    return JSONResponse(content = result)