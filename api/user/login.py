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
    json as _json,
    post as _post
)

# FUNCTION -> DECLARATION
@router.post("/api/user/login")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    json = await _json.namespace().init(request)
    post = await _post.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not all(post.exists("Uhashpass", "Uname")): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    json.load(data[0] if (data := await database.query(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = %s",
        [
            post.data["Uname"]
        ]
    )) else {"Uid": None, "Uhashpass": None})
    return await database.session(JSONResponse(content = True), json.data["Uid"]) if json.data["Uhashpass"] == post.data["Uhashpass"] else JSONResponse(content = False)