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

# FUNCTION -> DECLARATION
@router.post("/api/session/validate")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> LOAD EXTENSIONS
    exec(add(
        "database"
    ), globals())
    # DECLARATION -> ACTIVATE EXTENSIONS
    await asyncio.gather(
        database.get().init(request, response)
    )
    # DECLARATION -> QUERY
    return JSONResponse(content = database.get().validate)