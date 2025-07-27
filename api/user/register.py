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
    time as _time
)

# FUNCTION -> DECLARATION
@router.post("/api/user/register")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    post = await _post.namespace().init(request)
    time = await _time.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not all(post.exists("Uemail", "Uhashpass", "Uname")): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.query(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass) VALUES (%s, %s, %s)",
        [
            post.data["Uname"],
            post.data["Uemail"],
            post.data["Uhashpass"],
        ]
    ))