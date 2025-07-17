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
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/session/validate")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    # DECLARATION -> QUERY
    return JSONResponse(content = database.validate)