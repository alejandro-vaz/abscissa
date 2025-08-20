#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   REQUEST
#

# REQUEST -> FINAL
class UserLoginRequest(BaseModel):
    Uname: str = Field(..., pattern = SUG.PAT["Uname"])
    Uhashpass: str = Field(..., pattern = SUG.PAT["Uhashpass"])


#
#   RESPONSE
#

# RESPONSE -> FINAL
class UserLoginResponse(BaseModel):
    success: bool


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from website.extensions import (
    cryptography as _cryptography,
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/user/login")
async def output(request: Request, response: Response) -> UserLoginResponse:
    # DECLARATION -> INPUT
    try: packet = UserLoginRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    cryptography = await _cryptography.namespace().init(request, response)
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    user = º(await database.query(
        "SELECT Uid, Uhashpass FROM USERS WHERE Uname = %s",
        [
            packet.Uname
        ]
    ), 0)
    success = cryptography.verify(º(user, "Uhashpass"), packet.Uhashpass)
    if success: await database.session(º(user, "Uid"))
    data = {"success": success}
    # DECLARATION -> RETURN
    return UserLoginResponse(**data)