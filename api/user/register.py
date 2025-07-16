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
    # DECLARATION -> LOAD EXTENSIONS
    exec(add(
        "database",
        "post",
        "time"
    ), globals())
    # DECLARATION -> ACTIVATE EXTENSIONS
    await asyncio.gather(
        database.get().init(request, response),
        post.get().init(request, response),
        time.get().init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.get().checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.get().exists("Uemail", "Uhashpass", "Uname") == [True, True, True]): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.get().query(
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