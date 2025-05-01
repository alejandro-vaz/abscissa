#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   HTML
#

# HTML -> COMPILER
def compileView(content: str, name: str, module: list = [False, ""]):
    pattern = compile(r"<py>(.*?)</py>", dotall)
    commands = []
    for match in pattern.finditer(content):
        inner = match.group(1).strip()
        tokens = inner.split()
        if tokens:
            commands.append(tokens)
    modules = {
        "app": [],
        "base": [],
        "interface": []
    }
    for cmd in commands:
        action = cmd[0]
        if action == "add" and len(cmd) >= 3:
            area, subname = cmd[1], cmd[2]
            html = read(f"modules/{area}/{subname}.html")
            compiled = compileView(html, subname, module=[area, subname])
            modules[area].append(compiled)
        elif action == "call" and len(cmd) >= 2:
            area = cmd[1]
            part = "\n".join(modules.get(area, []))
            content = content.replace(f"<py> call {area} </py>", part)
    return content
    
# HTML -> VIEW
def loadView(name: str, module: list = [False, ""]) -> object:
    def view(request: object):
        content = read(f"content/{name}.html")
        result = compileView(content, name)
        return HTTP.HttpResponse(result)
    return view


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def view_init():
    pass