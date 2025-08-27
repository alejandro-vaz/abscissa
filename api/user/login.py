#
#   HANDLER
#

# HANDLER -> LOAD
import abscissa as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class UserLoginRequest(æ.BaseModel):
    Uname: str = æ.Field(..., pattern = æ.SUG.PAT["Uname"])
    Uhashpass: str = æ.Field(..., pattern = æ.SUG.PAT["Uhashpass"])


#
#   RESPONSE
#

# RESPONSE -> FINAL
class UserLoginResponse(æ.BaseModel):
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
@router.post("/api/user/login")
async def output(request: æ.Request, response: æ.Response) -> UserLoginResponse:
    # DECLARATION -> INPUT
    try: payload = UserLoginRequest(**await request.json())
    except: raise æ.HTTPException(**æ.SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    cryptography = await _cryptography.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    user = æ.º(await database.query(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = %s",
        [
            payload.Uname
        ]
    ), 0)
    success = cryptography.verify(æ.º(user, "Uhashpass"), payload.Uhashpass)
    if success: await database.session(æ.º(user, "Uid"))
    data = {"success": success}
    # DECLARATION -> RETURN
    return UserLoginResponse(**data)