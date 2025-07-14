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
@router.post("/api/user/login")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    exec(add(
        "binary",
        "bools",
        "database",
        "post", 
        "random", 
        "time"
    ), globals())
    await binary.get().init(request, response),
    await bools.get().init(request, response),
    await database.get().init(request, response),
    await post.get().init(request, response),
    await random.get().init(request, response),
    await time.get().init(request, response)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.get().checks(): raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.get().exists("Uhashpass", "Uname") == [True, True]): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    Uid, Uhashpass = data[0].values() if data := await database.get().query(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = %s",
        [
            post.get().data["Uname"]
        ]
    ) else None, None
    result = Uhashpass == post.get().data["Uhashpass"]
    if result: await database.get().session(Uid)
    return JSONResponse(content = result)