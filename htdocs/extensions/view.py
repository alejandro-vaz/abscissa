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
def compile_view(content: str) -> str:
    commands = []
    modules = {
        "app": [],
        "base": [],
        "interface": []
    }
    for tag in compile(r"<py>(.*?)</py>", dotall).finditer(content):
        tokens = tag.group(1).strip().split()
        if tokens:
            commands.append(tokens)
    for command in commands:
        action, area = command[0], command[1]
        if action == "add" and len(command) == 3:
            modules[area].append(read(f"modules/{area}/{command[2]}.html"))
        elif action == "call" and len(command) == 2:
            content = content.replace(f"<py> call {area} </py>", "\n".join(modules.get(area, [])))
    return content
    
# HTML -> VIEW
def create_view(viewName: str) -> object:
    def view(request: object):
        return HTTP.HttpResponse(compile_view(read(f"content/{viewName}.html")))
    return view


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def view_init():
    pass