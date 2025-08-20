#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from website import *


#
#   TIME
#

# TIME -> MODULES
import datetime
import zlib

# TIME -> CLASS
class namespace:
    # CLASS -> VARIABLES
    crc32date: int
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> namespace:
        self.crc32date = zlib.crc32(datetime.datetime.now().strftime('%Y-%m-%d').encode()) & 0xFFFFFFFF
        return self
    # CLASS -> TIME NOW
    def now(self) -> str:
        return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')