#
#   HEAD
#

# HEAD -> MODULES
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import uvicorn
from importlib import util
import re
import sys
import os
import SUG


#
#   GATEWAY
#

# GATEWAY -> DIR MOD
sys.path.append('/srv/www')
sys.path.append('/srv/www/website')

# GATEWAY -> APPLICATION
app = FastAPI()

# GATEWAY -> INCLUDE
def include(name: str) -> object:
    spec = util.spec_from_file_location(name, os.path.join(SUG.DIR + "/", os.path.join("api", f"{name}.py")))
    module = util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# GATEWAY -> SCRIPTS
for script in [
    "/concept/create",
    "/concept/search",
    "/organisation/create",
    "/organisation/join",
    "/organisation/search",
    "/problem/create",
    "/resource/create",
    "/resource/stream",
    "/session/refresh",
    "/session/validate",
    "/user/ban",
    "/user/delete",
    "/user/login",
    "/user/lookup",
    "/user/register",
    "/user/search"
]: app.include_router(include(f"{SUG.DIR}/api{script}.py").router)