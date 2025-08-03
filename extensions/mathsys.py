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
    # CLASS -> INIT
    async def init(self, request: Request) -> namespace: return self
    # CLASS -> COMPILE
    def compile(self, code: str) -> str: return mathsys.compile(code)