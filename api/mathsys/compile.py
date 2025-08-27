#
#   HANDLER
#

# HANDLER -> LOAD
import abscissa as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class MathsysCompileRequest(æ.BaseModel):
    Mcode: str


#
#   RESPONSE
#

# RESPONSE -> FINAL
class MathsysCompileResponse(æ.BaseModel):
    output: str


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    binary as _binary,
    mathsys as _mathsys
)

# FUNCTION -> DECLARATION
@router.post("/api/mathsys/compile")
async def output(request: æ.Request, response: æ.Response) -> MathsysCompileResponse:
    # DECLARATION -> INPUT
    try: payload = MathsysCompileRequest(**await request.json())
    except: raise æ.HTTPException(**æ.SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request, response)
    mathsys = await _mathsys.namespace().init(request, response)
    # DECLARATION -> DATA
    if mathsys.process(payload.Mcode):
        data = {"output": mathsys.compile()}
    else:
        mathsys.process("error")
        data = {"output": mathsys.compile()}
    # DECLARATION -> RETURN
    return MathsysCompileResponse(**data)