#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


#
#   PROCEDURES
#

# PROCEDURES -> SESSIONS
class CreateSessions(æ.pydantic.BaseModel):
    id: int = æ.pydantic.Field(ge = 0)
    ip: str = æ.pydantic.Field(max_length = 64)
class GetPrivateSessions(æ.pydantic.BaseModel):
    id: int = æ.pydantic.Field(ge = 0)
class ValidateSessions(æ.pydantic.BaseModel):
    sessionBytes: bytes = æ.pydantic.Field(min_length = 32, max_length = 32)
    ip: str = æ.pydantic.Field(max_length = 64)

# PROCEDURES -> USERS
class CreateUsers(æ.pydantic.BaseModel):
    username: str = æ.pydantic.Field(max_length = 32)
    email: str = æ.pydantic.Field(max_length = 64)
    password: str = æ.pydantic.Field(max_length = 256)
class GetPrivateUsers(æ.pydantic.BaseModel):
    id: int = æ.pydantic.Field(ge = 0)
class GetUidUsers(æ.pydantic.BaseModel):
    id: int = æ.pydantic.Field(ge = 0)
class GetUnameUsers(æ.pydantic.BaseModel):
    username: str = æ.pydantic.Field(max_length = 32)

# PROCEDURES -> ARRAY
procedures = {
    "CreateSessions": CreateSessions,
    "GetPrivateSessions": GetPrivateSessions,
    "ValidateSessions": ValidateSessions,
    "CreateUsers": CreateUsers,
    "GetPrivateUsers": GetPrivateUsers,
    "GetUidUsers": GetUidUsers,
    "GetUnameUsers": GetUnameUsers
}


#
#   DATABASE
#

# DATABASE -> CLASS
class namespace:
    # CLASS -> VARIABLES
    connection: æ.aiomysql.Connection
    # CLASS -> INIT
    async def init(self, socket: æ.fastapi.WebSocket) -> æ.typing.Self:
        self.connection = await æ.aiomysql.connect(**æ.SUG.DBC)
        return self
    # CLASS -> QUERY
    async def query(self, command: str, parameters: dict) -> æ.typing.Any:
        validated = procedures[command](**parameters)
        parameterList = [getattr(validated, field) for field in validated.model_fields]
        async with self.connection.cursor() as cursor:
            await cursor.execute(f"Call {command}({', '.join(['%s'] * len(parameterList))})", parameterList)
            rows = await cursor.fetchall()
            if len(rows) == 1 and len(rows[0]) == 1: return rows[0][0]
            return [dict(zip([column[0] for column in cursor.description], row)) for row in rows] if rows is not None else None