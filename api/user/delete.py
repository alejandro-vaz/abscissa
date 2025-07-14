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
@router.post("/api/user/delete")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database
    await asyncio.gather(
        database.init(request, response)
    )
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["user"]["delete"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "DELETE FROM USERS WHERE Uid = ?",
        [
            post.data["Uid"]
        ]
    ))