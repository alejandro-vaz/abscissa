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
@router.post("/api/concept/search")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> EXTENSIONS
    from website.extensions import bools, database, post
    await asyncio.gather(
        bools.init(request, response),
        database.init(request, response),
        post.init(request, response)
    )
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks: raise SUG.ERR[0]
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not bools.count(*post.exists("Ken", "Kes", "Kde")) == 1: raise SUG.ERR[1]
    # DECLARATION -> QUERY
    language = [lang for lang in ["Ken", "Kes", "Kde"] if post.exists(lang)][0]
    return JSONResponse(content = await database.request(
        f"SELECT * FROM CONCEPTS WHERE {language} LIKE ?",
        [
            "%" + post.data[language] + "%"
        ]
    ))