# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from handler import *

# SUPERGLOBALS
import SUG

def compileView(content, name, module=[False, ""]):
    # 1) find all <py>…</py> blocks
    pattern = compile(r"<py>(.*?)</py>", dotall)
    commands = []
    for match in pattern.finditer(content):
        inner = match.group(1).strip()
        tokens = inner.split()
        if tokens:
            commands.append(tokens)

    # 2) prepare module storage
    modules = {
        "app": [],
        "base": [],
        "interface": []
    }

    # 3) process each command, updating content as we go
    for cmd in commands:
        action = cmd[0]

        # add a sub-module (recursively compile its HTML)
        if action == "add" and len(cmd) >= 3:
            area, subname = cmd[1], cmd[2]
            html = read(f"modules/{area}/{subname}.html")
            compiled = compileView(html, subname, module=[area, subname])
            modules[area].append(compiled)

        # call: inject everything previously 'add'ed into this area
        elif action == "call" and len(cmd) >= 2:
            area = cmd[1]
            part = "\n".join(modules.get(area, []))
            content = content.replace(f"<py> call {area} </py>", part)

    # 4) only now return the fully-processed content
    return content
    
    
def loadView(name: str, module=[False, "name"]) -> str:
    def _view(request, *args, **kwargs):
        content = read(f"content/{name}.html")
        result = compileView(content, name)
        return HTTP.HttpResponse(result)
    return _view

def view_init():
    pass