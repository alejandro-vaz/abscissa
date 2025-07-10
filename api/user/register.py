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
@router.post("/api/user/register")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database, post, time
    await asyncio.gather(
        database.init(request, response),
        post.init(request, response),
        time.init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks.get(): raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Uemail", "Uhashpass", "Uname") == [True, True, True]): raise SUG.ERR[1]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.query(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass, Ujoined, Uplayground, Usettings, Oid, Urole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            post.data["Uname"],
            post.data["Uemail"],
            post.data["Uhashpass"],
            time.now(),
            {},
            {},
            0,
            0
        ]
    ))