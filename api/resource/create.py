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
@router.post("/api/resource/create")
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
    if not (post.exists("Kid", "Rlang", "Rvideo", "Rlink") == [True, True, True, True]): raise SUG.ERR[1]
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["resource"]["create"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "INSERT INTO RESOURCES (Kid, Rlang, Rvideo, Rlink) VALUES (?, ?, ?, ?)",
        [
            post.data["Kid"],
            post.data["Rlang"],
            post.data["Rvideo"],
            post.data["Rlink"]
        ]
    ))