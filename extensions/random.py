#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   RANDOM
#

# RANDOM -> MODULES
import random as rng

# RANDOM -> CLASS
class _random:
    # CLASS -> INIT
    async def init(self, request: Request) -> Self: return self
    # CLASS -> RANDOM INTEGER
    def integer(self, minimum: int, maximum: int) -> int:
        return rng.randint(minimum, maximum)