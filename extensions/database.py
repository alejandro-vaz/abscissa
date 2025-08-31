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

# DATABASE -> MODULES
import json

# DATABASE -> CLASS
class namespace:
    # CLASS -> VARIABLES
    connection: æ.Connection
    procedures = {
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
    }
    # CLASS -> INIT
    async def init(self, socket: æ.WebSocket) -> namespace:
        self.connection = await æ.aiomysql.connect(**æ.SUG.DBC)
        return self
    # CLASS -> QUERY
    async def query(self, command: str, parameters: list) -> æ.Any:
        typeList = self.procedures[command]
        for index in range(len(parameters)): assert isinstance(parameters[index], typeList[index])
        sql = f"{command}({', '.join(['%s'] * len(parameters))})"
        async with self.connection.cursor() as cursor:
            await cursor.execute(sql, parameters)
            rows = await cursor.fetchall()
            if len(rows) == 1 and len(rows[0]) == 1:
                return rows[0][0]
            elif rows is None:
                return None
            else:
                return [dict(zip([column[0] for column in cursor.description], row)) for row in rows]