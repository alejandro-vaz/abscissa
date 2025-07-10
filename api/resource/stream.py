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
@router.post("/api/resource/stream")
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
    if not (post.exists("Kid", "Rlang", "Rvideo") == [True, True, True]): raise SUG.ERR[1]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "SELECT * FROM RESOURCES WHERE Kid = ? AND Rlang = ? AND Rvideo = ?",
        [
            post.data["Kid"],
            post.data["Rlang"],
            post.data["Rvideo"]
        ]
    ))