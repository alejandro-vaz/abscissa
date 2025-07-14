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
@router.post("/api/organisation/create")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import database, post
    await asyncio.gather(
        database.init(request, response),
        post.init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks: raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Oname"): raise SUG.ERR[1]
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and database.user["Urole"] >= SUG.PER["organisation"]["create"]): raise SUG.ERR[2]
    # DECLARATION -> QUERY
    return JSONResponse(content = await database.request(
        "INSERT INTO ORGANISATIONS (Oname) VALUES (?)",
        [
            post.data["Oname"]
        ]
    ))