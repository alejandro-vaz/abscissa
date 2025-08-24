#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class ProblemLookupRequest(BaseModel):
    Pid: str = Field(..., pattern = SUG.PAT["Pid"])


#
#   RESPONSE
#

# RESPONSE -> PMETA CALCULATOR
class Calculator(Enum):
    scientific = "scientific"
    graphing = "graphing"
    financial = "financial"
    advanced = "advanced"

# RESPONSE -> PMETA
class Pmeta(BaseModel):
    calculator: bool | Calculator

# RESPONSE -> PSOLUTION
class Psolution(BaseModel):
    value: str
    error: float

# RESPONSE -> PDATAXX
class PdataXX(BaseModel):
    title: str
    instructions: str
    editor: str
    svg: str | None

# RESPONSE -> FINAL
class ProblemLookupResponse(BaseModel):
    Pid: str = Field(..., pattern = SUG.PAT["Pid"])
    Uid: int
    Kid: int
    Pedited: datetime
    Pmeta: Pmeta
    Psolution: Psolution
    Pdataen: PdataXX
    Pdataes: None | PdataXX
    Pdatade: None | PdataXX


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    binary as _binary,
    database as _database,
    json as _json
)

# FUNCTION -> DECLARATION
@router.post("/api/problem/lookup")
async def output(request: Request, response: Response) -> ProblemLookupResponse:
    # DECLARATION -> INPUT
    try: packet = ProblemLookupRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    binary = await _binary.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    json = await _json.namespace().init(request, response)
    # DECLARATION -> DATA
    data = º(await database.query(
            "SELECT * FROM PROBLEMS WHERE Pid = %s",
            [
                binary.toBytes(packet.Pid)
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