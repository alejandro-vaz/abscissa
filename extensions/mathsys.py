#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
import abscissa as æ


#
#   MATHSYS
#

# MATHSYS -> MODULES
import mathsys

# MATHSYS -> CLASS
class namespace:
    # CLASS -> VARIABLES
    code: str
    # CLASS -> INIT
    async def init(self, request: æ.Request, response: æ.Response) -> namespace: return self
    # CLASS -> LOAD
    def process(self, code: str) -> bool:
        self.code = code
        try:
            mathsys.compile(self.code)
            return True
        except:
            return False
    # CLASS -> COMPILE
    def compile(self) -> str:
        return mathsys.compile(self.code)