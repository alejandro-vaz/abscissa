#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   BOOLS
#

# BOOLS -> CLASS
class namespace:
    # CLASS -> INIT
    async def init(self, request: Request) -> Self: return self
    # CLASS -> COUNT BOOLS
    def count(self, *args: bool) -> int: return sum(map(bool, args))