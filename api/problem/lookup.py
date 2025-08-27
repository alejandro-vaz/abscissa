#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *
import abscissa as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class ProblemLookupRequest(æ.BaseModel):
    Pid: str = æ.Field(..., pattern = æ.SUG.PAT["Pid"])


#
#   RESPONSE
#

# RESPONSE -> PMETA CALCULATOR
class Calculator(æ.Enum):
    scientific = "scientific"
    graphing = "graphing"
    financial = "financial"
    advanced = "advanced"

# RESPONSE -> PMETA
class Pmeta(æ.BaseModel):
    calculator: bool | Calculator

# RESPONSE -> PSOLUTION
class Psolution(æ.BaseModel):
    value: str
    error: float

# RESPONSE -> PDATAXX
class PdataXX(æ.BaseModel):
    title: str
    instructions: str
    editor: str
    svg: str | None

# RESPONSE -> FINAL
class ProblemLookupResponse(æ.BaseModel):
    Pid: str = æ.Field(..., pattern = æ.SUG.PAT["Pid"])
    Uid: int
    Kid: int
    Pedited: æ.datetime
    Pmeta: Pmeta
    Psolution: Psolution
    Pdataen: PdataXX
    Pdataes: None | PdataXX
    Pdatade: None | PdataXX


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    binary as _binary,
    database as _database,
    json as _json
)

# FUNCTION -> DECLARATION
@router.post("/api/problem/lookup")
async def output(request: æ.Request, response: æ.Response) -> ProblemLookupResponse:
    # DECLARATION -> INPUT
    try: payload = ProblemLookupRequest(**await request.json())
    except: raise æ.HTTPException(**æ.SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    json = await _json.namespace().init(request, response)
    # DECLARATION -> DATA
    data = æ.º(await database.query(
            "SELECT * FROM PROBLEMS WHERE Pid = %s",
            [
                binary.toBytes(payload.Pid)
            ]
    ), 0)
    json.parse(data, [
        "Pmeta",
        "Psolution",
        "Pdataen",
        "Pdataes",
        "Pdatade"
    ])
    # DECLARATION -> RETURN
    return ProblemLookupResponse(**data)