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
@router.post("/api/organisation/join")
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
    if not post.exists("Oid"): raise SUG.ERR[1]
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["organisation"]["join"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    result = bool(await database.request(
        "SELECT * FROM ORGANISATIONS WHERE Oid = ?",
        [
            post.data["Oid"]
        ]
    ))
    if result:
        await database.request(
            "UPDATE USERS SET Oid = ? WHERE Uid = ?",
            [
                post.data["Oid"],
                database.user["Uid"]
            ]
        )
    return JSONResponse(content = result)