#
#   TIME
#

# TIME -> MODULES
import datetime
import zlib

# TIME -> NAMESPACE
time = ContextVar("time")

# TIME -> CLASS
class _time:
    # CLASS -> VARIABLES
    crcdate: int
    # CLASS -> CREATION
    def __init__(self) -> None: time.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None:
        self.crcdate = zlib.crc32(datetime.datetime.now().strftime('%Y-%m-%d').encode()) & 0xFFFFFFFF
    # CLASS -> TIME NOW
    def now(self) -> str:
        return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

# TIME -> INIT
_time()