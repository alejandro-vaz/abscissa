#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


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
from extensions import (
    mathsys as _mathsys
)

# FUNCTION -> DECLARATION
@router.websocket("/api/mathsys/compile")
@æ.handler(MathsysCompileRequest, MathsysCompileResponse, [_mathsys])
async def output(payload: MathsysCompileRequest, extensions: list[æ.Any]) -> dict:
    [mathsys] = extensions
    if not mathsys.process(payload.Mcode): mathsys.process("error")
    return {"output": mathsys.compile()}