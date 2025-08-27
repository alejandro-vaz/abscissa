#
#   HANDLER
#

# HANDLER -> LOAD
import abscissa as æ


#
#   RESPONSE
#

# RESPONSE -> USETTINGS
class Usettings(æ.BaseModel): pass

# RESPONSE -> FINAL
class UserDataResponse(æ.BaseModel):
    Uid: int
    Uname: str = æ.Field(..., pattern = æ.SUG.PAT["Uname"])
    Uemail: str = æ.Field(..., pattern = æ.SUG.PAT["Uemail"])
    Ujoined: æ.datetime
    Usettings: Usettings
    Oid: int
    Urole: int


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    database as _database,
    json as _json
)

# FUNCTION -> DECLARATION
@router.post("/api/user/data")
async def output(request: æ.Request, response: æ.Response) -> UserDataResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request, response)
    json = await _json.namespace().init(request, response)
    # DECLARATION -> USER AUTHENTIFIED WITH PERMISSIONS
    if not (database.validate and æ.º(database.user, "Urole") >= 0): raise æ.HTTPException(**æ.SUG.ERR[2])
    # DECLARATION -> DATA
    data: dict = database.user
    json.parse(data, [
        "Usettings"
    ])
    data.pop("Uhashpass")
    # DECLARATION -> RESPONSE
    return UserDataResponse(**data)