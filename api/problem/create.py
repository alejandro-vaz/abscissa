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
@router.post("/api/problem/create")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database, post, time
    await asyncio.gather(
        database.init(request, response),
        post.init(request, response),
        time.init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks: raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not all(post.exists("Kid", "Pmeta", "Psolution", "Pdataen")): raise SUG.ERR[1]
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["problem"]["create"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "INSERT INTO PROBLEMS (Pid, Uid, Kid, Pedited, Pmeta, Psolution, Pdataen, Pdataes, Pdatade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            0x00000000,
            database.user["Uid"],
            post.data["Kid"],
            time.now(),
            post.data["Pmeta"],
            post.data["Psolution"],
            post.data["Pdataen"],
            post.data["Pdataes"] if post.data["Pdataes"] else None,
            post.data["Pdatade"] if post.data["Pdatade"] else None
        ]
    ))