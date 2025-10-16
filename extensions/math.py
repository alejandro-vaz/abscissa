#
#   HANDLER
#

# HANDLER -> LOAD
import __init__ as æ


#
#   MATHSYS
#

# MATHSYS -> MODULES
import mathsys.dev as mathsys

# MATHSYS -> CLASS
class namespace:
    # CLASS -> VARIABLES
    compiled: str
    # CLASS -> INIT
    async def init(self, socket: æ.fastapi.WebSocket) -> æ.typing.Self: return self
    # CLASS -> LOAD
    def process(self, code: str) -> None:
        try: self.compiled = mathsys.latex(code)
        except: self.compiled = "error"