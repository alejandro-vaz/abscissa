#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   REQUEST
#

# REQUEST -> FINAL
class UserDataRequest(BaseModel): pass


#
#   RESPONSE
#

# RESPONSE -> USETTINGS
class Usettings(BaseModel): pass

# RESPONSE -> FINAL
class UserDataResponse(BaseModel):
    Uid: int
    Uname: str = Field(..., pattern = SUG.PAT["Uname"])
    Uemail: str = Field(..., pattern = SUG.PAT["Uemail"])
    Uhashpass: str = Field(..., pattern = SUG.PAT["Uhashpass"])
    Ujoined: datetime
    Usettings: Usettings
    Oid: int
    Urole: int


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from website.extensions import (
    database as _database,
    json as _json
)

# FUNCTION -> DECLARATION
@router.post("/api/user/data")
async def output(request: Request, response: Response) -> UserDataResponse:
    # DECLARATION -> INPUT
    try: packet = UserDataRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request, response)
    json = await _json.namespace().init(request, response)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and º(database.user, "Urole") >= 0): raise HTTPException(**SUG.ERR[2])
    # DECLARATION -> DATA
    data = database.user
    json.parse(data, [
        "Usettings"
    ])
    # DECLARATION -> RESPONSE
    return UserDataResponse(**data)