#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class MathsysCompileRequest(æ.pydantic.BaseModel):
    Mcode: str = æ.pydantic.Field(min_length = 0, max_length = 16384)


#
#   RESPONSE
#

# RESPONSE -> FINAL
class MathsysCompileResponse(æ.pydantic.BaseModel):
    output: str = æ.pydantic.Field(min_length = 0, max_length = 16384)


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.fastapi.APIRouter()

# FUNCTION -> EXTENSIONS
from extensions import (
    math as _math
)

# FUNCTION -> DECLARATION
@router.websocket("/api/mathsys/compile")
@æ.handler(MathsysCompileRequest, MathsysCompileResponse, [_math])
async def output(payload: MathsysCompileRequest, extensions: list[æ.typing.Any]) -> dict:
    [math] = extensions
    math.process(payload.Mcode)
    return {"output": math.compiled}