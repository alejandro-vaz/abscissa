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
    binary as _binary,
    database as _database,
    json as _json,
    post as _post
)

# FUNCTION -> DECLARATION
@router.post("/api/problem/lookup")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request)
    database = await _database.namespace().init(request)
    json = await _json.namespace().init(request)
    post = await _post.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Pid"): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    json.load((await database.query(
        "SELECT * FROM PROBLEMS WHERE Pid = %s",
        [
            binary.str2bin(post.data["Pid"])
        ]
    ))[0])
    json.tojson("Pmeta", "Pdataen", "Pdataes", "Pdatade", "Psolution")
    return JSONResponse(content = json.data)