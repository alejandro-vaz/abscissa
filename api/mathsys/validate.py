#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class MathsysValidateRequest(BaseModel):
    Mcode: str


#
#   RESPONSE
#

# RESPONSE -> FINAL
class MathsysValidateResponse(BaseModel):
    validated: bool


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
@router.post("/api/mathsys/validate")
async def output(request: Request, response: Response) -> JSONResponse:
    # DECLARATION -> INPUT
    try: packet = MathsysValidateRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    mathsys = await _mathsys.namespace().init(request, response)
    # DECLARATION -> DATA
    data = mathsys.process(packet.Mcode)
    # DECLARATION -> RETURN
    return MathsysValidateResponse(**data)