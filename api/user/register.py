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
@router.post("/api/user/register")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    post = await _post.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not all(post.exists("Uemail", "Uhashpass", "Uname")): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    response.load(await database.query(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass) VALUES (%s, %s, %s)",
        [
            post.data["Uname"],
            post.data["Uemail"],
            post.data["Uhashpass"]
        ]
    ))
    return response.get()