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
    response as _response
)

# FUNCTION -> DECLARATION
@router.post("/api/user/data")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["user"]["data"]): raise HTTPException(**SUG.ERR[2])
    # DECLARATION -> QUERY
    response.load(database.user)
    return response.get()