#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   DATABASE
#

# DATABASE -> MODULES
import datetime
import json
import secrets

# DATABASE -> CLASS
class namespace:
    # CLASS -> VARIABLES
    connection: Connection
    ip: str
    Sid: bytes
    validate: bool
    user: dict
    # CLASS -> INIT
    async def init(self, request: Request) -> Self:
        self.connection = await aiomysql.connect(**SUG.DBC)
        self.ip = request.client.host
        self.Sid = bytes.fromhex(request.cookies.get("Sid")) if request.cookies.get("Sid") is not None else None
        self.validate = bool(await self.query(
            "SELECT * FROM SESSIONS WHERE Sid = %s",
            [
                self.Sid 
            ]
        )) if self.Sid is not None else False
        self.user = (await self.query(
            "SELECT * FROM USERS WHERE Uid = %s",
            [
                (await self.query(
                    "SELECT Uid FROM SESSIONS WHERE Sid = %s",
                    [
                        self.Sid
                    ]
                ))[0]["Uid"]
            ]
        ))[0] if self.validate else None
        return self
    # CLASS -> QUERY
    async def query(self, command: str, parameters: list) -> list[dict] | bool:
        for index in range(len(parameters)):
            if isinstance(parameters[index], dict | list):
                parameters[index] = json.dumps(parameters[index])
        async with self.connection.cursor() as cursor:
            try:
                await cursor.execute(command, parameters)
                return [dict(zip([column[0] for column in cursor.description], row)) for row in await cursor.fetchall()] if cursor.description else True
            except Exception as error:
                debug(error.args[0], error.args[1])
                return False
    # CLASS -> SESSION
    async def session(self, response: JSONResponse, Uid: int) -> JSONResponse:
        self.Sid = secrets.token_bytes(32)
        await self.query(
            "INSERT INTO SESSIONS (Sid, Sip, Sexpires, Uid) VALUES (%s, %s, %s, %s) ON DUPLICATE KEY UPDATE Sid = VALUES(Sid), Sip = VALUES(Sip), Sexpires = VALUES(Sexpires)",
            [
                self.Sid,
                self.ip,
                (datetime.datetime.now() + datetime.timedelta(seconds=604800)).strftime("%Y-%m-%d %H:%M:%S"),
                Uid
            ]
        )
        response.set_cookie(
            "Sid",
            self.Sid.hex().upper(),
            max_age = datetime.timedelta(seconds = 604800),
            httponly = True,
            secure = True,
            samesite = "lax"
        )
        return response