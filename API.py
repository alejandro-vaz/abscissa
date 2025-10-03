#
#   HEAD
#

# HEAD -> MODULES
from fastapi import FastAPI

# HEAD -> API
from api.mathsys import (
    compile as mathsysCompile
)


#
#   GATEWAY
#

# GATEWAY -> APPLICATION
app = FastAPI()

# GATEWAY -> SCRIPTS
for script in [
    mathsysCompile
]: app.include_router(script.router)