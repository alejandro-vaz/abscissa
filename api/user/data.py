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
    json as _json
)

# FUNCTION -> DECLARATION
@router.post("/api/user/data")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    json = await _json.namespace().init(request)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["user"]["data"]): raise HTTPException(**SUG.ERR[2])
    # DECLARATION -> QUERY
    json.load(database.user)
    return JSONResponse(content = json.data)