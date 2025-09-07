#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
import __init__ as æ


#
#   DATABASE
#

# DATABASE -> PROCEDURES
procedures = {}
for name, types in {
    "CreateFeatures": [str, str],
    "GetAllFeatures": [],
    "UpvoteFeatures": [int],
    "DownvoteFeatures": [int],
    "CreateSessions": [int, str],
    "GetPrivateSessions": [int],
    "ValidateSessions": [bytes, str],
    "CreateUsers": [str, str, str],
    "GetPrivateUsers": [int],
    "GetUidUsers": [int],
    "GetUnameUsers": [str]
}.items():
    procedures[name] = æ.create_model(f"{name}Params", **{f"arg{index}": (valueType, ...) for index, valueType in enumerate(types)})

# DATABASE -> CLASS
class namespace:
    # CLASS -> VARIABLES
    connection: æ.Connection
    # CLASS -> INIT
    async def init(self, socket: æ.WebSocket) -> namespace:
        self.connection = await æ.aiomysql.connect(**æ.SUG.DBC)
        await self.connection.autocommit(True)
        return self
    # CLASS -> QUERY
    async def query(self, command: str, parameters: list) -> æ.Any:
        æ.TypeAdapter(procedures[command]).validate_python({f"arg{index}": value for index, value in enumerate(parameters)})
        async with self.connection.cursor() as cursor:
            await cursor.execute(f"Call {command}({', '.join(['%s'] * len(parameters))})", parameters)
            rows = await cursor.fetchall()
            if len(rows) == 1 and len(rows[0]) == 1: return rows[0][0]
            return [dict(zip([column[0] for column in cursor.description], row)) for row in rows] if rows is not None else None