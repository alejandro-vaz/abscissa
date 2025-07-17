#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   POST
#

# POST -> MODULES
import re

# POST -> CLASS
class namespace:
    # CLASS -> VARIABLES
    data: dict
    # CLASS -> INIT
    async def init(self, request: Request) -> Self:
        self.data = await request.json()
        return self
    # CLASS -> EXISTS
    def exists(self, *keys: str) -> bool | list[bool]:
        return keys[0] in self.data if len(keys) == 1 else [key in self.data for key in keys]
    # CLASS -> CHECKS
    def checks(self) -> bool:
        for key, value in self.data.items():
            if isinstance(SUG.PAT[key], set):
                if not SUG.PAT[key].issubset(value): return False
            else:
                if not bool(re.compile(SUG.PAT[key]).fullmatch(str(value))): return False
        return True