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
    post as _post,
    response as _response
)

# FUNCTION -> DECLARATION
@router.post("/api/problem/lookup")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request)
    database = await _database.namespace().init(request)
    post = await _post.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Pid"): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    binary.load(post.data["Pid"])
    response.load(º(await database.query(
        "SELECT * FROM PROBLEMS WHERE Pid = %s",
        [
            binary.data
        ]
    ), 0))
    response.tojson("Pmeta", "Pdataen", "Pdataes", "Pdatade", "Psolution")
    return response.get()