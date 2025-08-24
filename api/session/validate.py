#
#   HANDLER
#

# HANDLER -> LOAD
from abscissa import *


#
#   REQUEST
#

# REQUEST -> FINAL
class SessionValidateRequest(BaseModel): pass


#
#   RESPONSE
#

# RESPONSE -> FINAL
class SessionValidateResponse(BaseModel):
    validated: bool


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = APIRouter()

# FUNCTION -> EXTENSIONS
from abscissa.extensions import (
    database as _database
)

# FUNCTION -> DECLARATION
@router.post("/api/session/validate")
async def output(request: Request, response: Response) -> SessionValidateResponse:
    # DECLARATION -> INPUT
    try: packet = SessionValidateRequest(**await request.json())
    except: raise HTTPException(**SUG.ERR[0])
    # DECLARATION -> ACTIVATE EXTENSIONS
    database = await _database.namespace().init(request, response)
    # DECLARATION -> DATA
    data = {
        "validated": database.validate
    }
    # DECLARATION -> RETURN
    return SessionValidateResponse(**data)