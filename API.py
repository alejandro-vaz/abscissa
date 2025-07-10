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
    spec = util.spec_from_file_location(name, os.path.join(str(os.path.dirname(os.path.abspath(__file__))) + "/", os.path.join("api", f"{name}.py")))
    module = util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# GATEWAY -> FILE READER
def read(path: str) -> str:
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), path), "r") as file: return file.read()


# GATEWAY -> COMPILER
def transformView(content: str) -> str:
    modules = {
        "app": [],
        "interface": []
    }
    commands = []
    for tag in re.compile(r"<py>(.*?)</py>", re.DOTALL).finditer(content):
        commands.append(tag.group(1).strip().split())
    for command in commands:
        match (command[0], len(command)):
            case "add", 3: modules[command[1]].append(read(f"modules/{command[1]}/{command[2]}.html"))
            case "call", 2: content = content.replace(f"<py> call {command[1]} </py>", "\n".join(modules.get(command[1], [])))
    return content

# GATEWAY -> VIEW
def newView(viewName: str) -> object:
    @app.get("/" + viewName)
    def view() -> HTMLResponse:
        return HTMLResponse(content = transformView(read(str(os.path.dirname(os.path.abspath(__file__))) + f"/content/&{viewName}.html")))
    return view

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
]: app.include_router(include(str(os.path.dirname(os.path.abspath(__file__))) + "/api" + script).router)

# GATEWAY -> VIEWS
for view in [
    "",
    "dashboard",
    "error",
    "login",
    "register"
]: newView(view)

# GATEWAY -> SERVER
if __name__ == "__main__":
    uvicorn.run("API:app", 
        host = "127.0.0.1",
        port = 8000,
        log_level = "info",
        reload = True
    )