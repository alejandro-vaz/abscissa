#
#   HANDLER
#

# HANDLER -> LOAD
import abscissa as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class UserRegisterRequest(æ.BaseModel):
    Uname: str = æ.Field(..., pattern = æ.SUG.PAT["Uname"])
    Uemail: str = æ.Field(..., pattern = æ.SUG.PAT["Uemail"])
    Uhashpass: str = æ.Field(..., pattern = æ.SUG.PAT["Uhashpass"])


#
#   RESPONSE
#

# RESPONSE -> FINAL
class UserRegisterResponse(æ.BaseModel):
    success: bool


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    cryptography as _cryptography,
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/user/register")
async def output(request: æ.Request, response: æ.Response) -> UserRegisterResponse:
    # DECLARATION -> INPUT
    try: payload = UserRegisterRequest(**await request.json())
    except: raise æ.HTTPException(**æ.SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    cryptography = await _cryptography.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    success = await database.query(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass) VALUES (%s, %s, %s)",
        [
            payload.Uname,
            payload.Uemail,
            cryptography.hash(payload.Uhashpass)
        ]
    )
    data = {"success": success}
    # DECLARATION -> RESPONSE
    return UserRegisterResponse(**data)