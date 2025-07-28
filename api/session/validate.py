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
@router.post("/api/session/validate")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> QUERY
    response.load(database.validate)
    return response.get()