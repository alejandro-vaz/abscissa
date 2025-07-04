#
#   HANDLER
#

# HANDLER -> LOAD
from website import *


#
#   MANAGER
#

# MANAGER -> INCLUDE PYTHON FILE
def include(name: str) -> object:
    spec = util.spec_from_file_location(name, os.path.join(SUG.DIR, os.path.join("api", f"{name}.py")))
    module = util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# MANAGER -> FILE READER
def read(path: str) -> str:
    with open(SUG.DIR + path, "r") as file: return file.read()


#
#   HTML
#

# HTML -> COMPILER
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
    
# HTML -> VIEW
def newView(viewName: str) -> object:
    def view(request: HttpRequest) -> HttpResponse:
        return HttpResponse(transformView(read(f"content/&{viewName}.html")))
    return view


#
#   URL PATTERNS
#

# URL PATTERNS -> INITIALIZATION
urlpatterns = []

# URL PATTERNS -> VIEWS
views = [
    "",
    "dashboard",
    "error",
    "playground",
    "search",
    "settings",
    "stats",
    "user"
]

# URL PATTERNS -> API
scripts = [
    "concept/create",
    "concept/search",
    "organisation/create",
    "organisation/join",
    "organisation/search",
    "problem/create",
    "resource/create",
    "resource/stream",
    "session/refresh",
    "session/validate",
    "user/ban",
    "user/delete",
    "user/login",
    "user/lookup",
    "user/register",
    "user/search"
]

# URL PATTERNS -> ADD PATTERNS
for view in views:
    urlpatterns.append(urls.path(view, newView(view)))
for script in scripts:
    urlpatterns.append(urls.path(f'api/{script}', include(script).output))