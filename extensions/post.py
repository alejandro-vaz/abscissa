#
#   POST
#

# POST -> MODULES
import re

# POST -> NAMESPACE
post = ContextVar("post")

# POST -> CLASS
class _post:
    # CLASS -> VARIABLES
    data: dict
    # CLASS -> CREATION
    def __init__(self) -> None: post.set(self)
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> None:
        self.data = await request.json()
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

# POST -> INIT
_post()