#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from website import *


#
#   MATHSYS
#

# MATHSYS -> MODULES
import mathsys

# MATHSYS -> CLASS
class namespace:
    # CLASS -> VARIABLES
    code: str
    validate: bool
    # CLASS -> INIT
    async def init(self, request: Request, response: Response) -> namespace:
        return self
    # CLASS -> LOAD
    def process(self, code: str) -> bool:
        self.code = code
        self.validate = mathsys.validate(self.code)
        return self.validate
    # CLASS -> VIEW
    def view(self) -> str:
        return mathsys.view(self.code)
    # CLASS -> COMPILE
    def compile(self, target: str) -> bytes:
        return mathsys.compile(self.code, target)