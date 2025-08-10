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
    post as _post,
    response as _response
)

# FUNCTION -> DECLARATION
@router.post("/api/mathsys/validate")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    mathsys = await _mathsys.namespace().init(request)
    post = await _post.namespace().init(request)
    response = await _response.namespace().init(request)
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks(): raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not post.exists("Mcode"): raise HTTPException(**SUG.ERR[1])
    # DECLARATION -> QUERY
    mathsys.load(post.data["Mcode"])
    response.load(mathsys.validate)
    return response.get()