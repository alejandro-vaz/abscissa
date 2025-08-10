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
    async def init(self, request: Request) -> namespace:
        return self
    # CLASS -> LOAD
    def load(self, code: str) -> None:
        self.code = code
        self.validate = mathsys.validate(self.code)
    # CLASS -> VIEW
    def view(self) -> str:
        return mathsys.view(self.code) if self.validate else ""
    # CLASS -> COMPILE
    def compile(self) -> bytes:
        return mathsys.compile(self.code, "web") if self.validate else b""