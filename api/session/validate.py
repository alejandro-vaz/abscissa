#
#   HANDLER
#

# HANDLER -> LOAD
import abscissa as æ


#
#   RESPONSE
#

# RESPONSE -> FINAL
class SessionValidateResponse(æ.BaseModel):
    validated: bool


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/session/validate")
async def output(request: æ.Request, response: æ.Response) -> SessionValidateResponse:
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    data = {
        "validated": database.validate
    }
    # DECLARATION -> RETURN
    return SessionValidateResponse(**data)