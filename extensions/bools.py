#
#   BOOLS
#

# BOOLS -> NAMESPACE
bools = ContextVar("bools")

# BOOLS -> CLASS
class _bools:
    # CLASS -> CREATION
    def __init__(self) -> None: bools.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None: pass
    # CLASS -> COUNT BOOLS
    def count(self, *args: bool) -> int: return sum(map(bool, args))

# BOOLS -> INIT
_bools()