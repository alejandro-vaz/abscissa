#
#   MASTER SUPERGLOBALS
#

# MASTER SUPERGLOBALS -> SCRIPTS
SRC = [
    "/mathsys/compile",
    "/mathsys/validate",
    "/mathsys/view",
    "/problem/lookup",
    "/session/validate",
    "/user/data",
    "/user/login",
    "/user/register"
]

# MASTER SUPERGLOBALS -> DATABASE CREDENTIALS
DBC = {
    "host": "localhost",
    "port": 3306,
    "user": "phpmyadmin",
    "password": "orangepi",
    "db": "abscissa",
    "autocommit": True
}

# MASTER SUPERGLOBALS -> PARENT DIR
PDR = "/srv/www"

# MASTER SUPERGLOBALS -> DIRECTORY
DIR = "/srv/www/abscissa"

# MASTER SUPERGLOBALS -> REGEX PATTERNS
PAT = {
    "Pid": r'^[A-F0-9]{8}$',
    "Uemail": r'^[A-Za-z0-9._%\-]{8,64}@gmail\.com$',
    "Uhashpass": r"^.{8,256}$",
    "Uname": r'^[a-zA-Z0-9_-]{4,32}$'
}

# MASTER SUPERGLOBALS -> ERROR CODES
ERR = [
    {"status_code": 400, "detail": "Bad request"},
    {"status_code": 403, "detail": "Forbidden"},
    {"status_code": 422, "detail": "Unprocessable"}
]