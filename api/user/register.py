#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class UserRegisterRequest(BaseModel):
    Uname: str = Field(..., pattern = SUG.PAT["Uname"])
    Uemail: str = Field(..., pattern = SUG.PAT["Uemail"])
    Uhashpass: str = Field(..., pattern = SUG.PAT["Uhashpass"])


#
#   RESPONSE
#

# RESPONSE -> FINAL
class UserRegisterResponse(BaseModel):
    success: bool


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    cryptography as _cryptography,
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/user/register")
async def output(request: Request) -> JSONResponse:
    # DECLARATION -> INPUT
    try: packet = UserRegisterRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    cryptography = await _cryptography.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    success = await database.query(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass) VALUES (%s, %s, %s)",
        [
            packet.Uname,
            packet.Uemail,
            cryptography.hash(packet.Uhashpass)
        ]
    )
    data = {"success": success}
    # DECLARATION -> RESPONSE
    return UserRegisterResponse(**data)