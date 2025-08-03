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

# FUNCTION -> EXTENSIONS
from website.extensions import (
    database as _database,
    post as _post,
    response as _response
)

# FUNCTION -> DECLARATION
@router.post("/api/user/login")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    post = await _post.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not all(post.exists("Uhashpass", "Uname")): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    user = º(await database.query(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = %s",
        [
            post.data["Uname"]
        ]
    ), 0)
    response.load(º(user, "Uhashpass") == post.data["Uhashpass"])
    return await database.session(response.get(), º(user, "Uid")) if response.data else response.get()