#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class FeaturesCreateRequest(æ.BaseModel):
    name: str = æ.Field(pattern = r".{4,128}")
    description: str = æ.Field(min_length=64, max_length=65535)


#
#   RESPONSE
#

# RESPONSE -> FINAL
class FeaturesCreateResponse(æ.BaseModel): pass


#
#   FUNCTION
#

# FUNCTION -> ROUTER
router = æ.APIRouter()

# FUNCTION -> EXTENSIONS
from extensions import (
    database as _database
)

# FUNCTION -> DECLARATION
@router.websocket("/api/features/create")
@æ.handler(FeaturesCreateRequest, FeaturesCreateResponse, [_database])
async def output(payload: FeaturesCreateRequest, extensions: list[æ.Any]) -> dict:
    [database] = extensions
    await database.query("CreateFeatures", [
        payload.name,
        payload.description
    ])
    return {}