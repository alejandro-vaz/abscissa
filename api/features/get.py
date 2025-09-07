#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


#
#   REQUEST
#

# REQUEST -> FINAL
class FeaturesGetRequest(æ.BaseModel): pass


#
#   RESPONSE
#

# RESPONSE -> FEATURE
class Feature(æ.BaseModel):
    Fid: int
    Fname: str = æ.Field(pattern = r".{4,128}")
    Ftext: str = æ.Field(min_length=64, max_length=65535)
    Fvotes: int

# RESPONSE -> FINAL
class FeaturesGetResponse(æ.BaseModel):
    features: list[Feature]


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
@router.websocket("/api/features/get")
@æ.handler(FeaturesGetRequest, FeaturesGetResponse, [_database])
async def output(payload: FeaturesGetRequest, extensions: list[æ.Any]) -> dict:
    [database] = extensions
    return {
        "features": await database.query("GetAllFeatures", [])
    }