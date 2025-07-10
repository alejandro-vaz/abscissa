#
#   DATABASE
#

# DATABASE -> MODULES
import datetime
import json
import secrets

# DATABASE -> NAMESPACE
database = ContextVar("database")

# DATABAES -> CLASS
class _database:
    # CLASS -> VARIABLES
    connection: Connection
    ip: str
    response: Response
    Sid: bytes
    validate: bool
    user: dict
    # CLASS -> CREATION
    def __init__(self) -> None: database.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None:
        self.connection = await aiomysql.connect(**SUG.DBC)
        self.ip = request.client.host
        self.response = response
        self.Sid = bytes.fromhex(request.cookies.get("Sid")) if request.cookies.get("Sid") is not None else None
        self.validate = bool(await self.query(
            "SELECT * FROM SESSIONS WHERE Sid = %s",
            [
                self.Sid 
            ]
        )) if self.Sid is not None and len(self.Sid) == 4 else False
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
    # CLASS -> QUERY
    async def query(self, command: str, parameters: list) -> list[dict] | bool:
        async with self.connection.cursor() as cursor:
            await cursor.execute(command, parameters)
            return [dict(zip([column[0] for column in cursor.description], row)) for row in await cursor.fetchall()] if cursor.description else True
    # CLASS -> SESSION
    async def session(self, Uid: int):
        self.Sid = secrets.token_bytes(4)
        await self.query(
            "UPDATE SESSIONS SET Sid = %s, Sip = %s, Sexpires = %s WHERE Uid = %s",
            [
                self.Sid,
                self.ip,
                (datetime.datetime.now() + datetime.timedelta(seconds=604800)).strftime("%Y-%m-%d %H:%M:%S"),
                Uid
            ]
        )
        self.response.set_cookie(
            "Sid",
            self.Sid.hex().upper(),
            max_age = datetime.timedelta(seconds = 604800),
            httponly = True,
            secure = True,
            samesite = "lax"
        )

# DATABASE -> INIT
_database()