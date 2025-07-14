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
@router.post("/api/session/refresh")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database, random
    await asyncio.gather(
        database.init(request, response),
        random.init(request, response)
    )
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["session"]["refresh"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    await database.newSession()
    return JSONResponse(content = True)