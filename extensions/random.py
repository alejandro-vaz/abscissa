#
#   RANDOM
#

# RANDOM -> MODULES
import random as rng

# RANDOM -> NAMESPACE
random = ContextVar("random")

# RANDOM -> CLASS
class _random:
    # CLASS -> CREATION
    def __init__(self) -> None: random.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None: pass
    # CLASS -> RANDOM INTEGER
    def integer(self, minimum: int, maximum: int) -> int:
        return rng.randint(minimum, maximum)

# RANDOM -> INIT
_random()