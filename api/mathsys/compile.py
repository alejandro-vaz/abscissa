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
    mathsys as _mathsys,
    post as _post
)

# FUNCTION -> DECLARATION
@router.post("/api/mathsys/compile")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    mathsys = await _mathsys.namespace().init(request)
    post = await _post.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Mcode"): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    try: return JSONResponse(content = mathsys.compile(post.data["Mcode"]))
    except: return JSONResponse(content = False)