#
#   HEAD
#

# HEAD -> MODULES
from fastapi import FastAPI

# HEAD -> API
from api.features import (
    create as featuresCreate,
    get as featuresGet
)
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
    featuresCreate,
    featuresGet,
    mathsysCompile
]: app.include_router(script.router)