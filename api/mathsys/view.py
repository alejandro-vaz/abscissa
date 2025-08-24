#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class MathsysViewRequest(BaseModel):
    Mcode: str


#
#   RESPONSE
#

# RESPONSE -> FINAL
class MathsysViewResponse(BaseModel):
    output: str | None


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    mathsys as _mathsys
)

# FUNCTION -> DECLARATION
@router.post("/api/mathsys/view")
async def output(request: Request, response: Response) -> MathsysViewResponse:
    # DECLARATION -> INPUT
    try: packet = MathsysViewRequest(**await request.json()) 
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    mathsys = await _mathsys.namespace().init(request, response)
    # DECLARATION -> DATA
    data = {
        "output": mathsys.view() if mathsys.process(packet.Mcode) else None
    }
    # DECLARATION -> RETURN
    return MathsysViewResponse(**data)