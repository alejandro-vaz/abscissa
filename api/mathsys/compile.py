#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class MathsysCompileRequest(BaseModel):
    Mcode: str


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    binary as _binary,
    mathsys as _mathsys
)

# FUNCTION -> DECLARATION
@router.post("/api/mathsys/compile")
async def output(request: Request, response: Response) -> StreamingResponse:
    # DECLARATION -> INPUT
    try: packet = MathsysCompileRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request, response)
    mathsys = await _mathsys.namespace().init(request, response)
    # DECLARATION -> DATA
    if mathsys.process(packet.Mcode):
        binary.load(mathsys.compile())
    else:
        mathsys.process("error")
        binary.load(mathsys.compile())
    data = binary.get()
    # DECLARATION -> RETURN
    return data