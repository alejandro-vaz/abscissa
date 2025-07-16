#
#   MASTER SUPERGLOBALS
#

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
DIR = "/srv/www/website"

# MASTER SUPERGLOBALS -> REGEX PATTERNS
PAT = {
    "Cprocess": {
        "content", 
        "duration"
    },
    "Kde": r"^.{8,64}$",
    "Ken": r"^.{8,64}$",
    "Kes": r"^.{8,64}$",
    "Kid": r"^\d+$",
    "Oid": r"^\d+$",
    "Oname": r'^[a-zA-Z0-9_-]{4,32}$',
    "Pdataen": {
        "editor",
        "instructions",
        "svg"
    },
    "Pdataes": {
        "editor",
        "instructions",
        "svg"
    },
    "Pdatade": {
        "editor",
        "instructions",
        "svg"
    },
    "Pid": r'^[A-Z0-9]{8}$',
    "Pmeta":{
        "calculator",
        "postResult",
        "preResult"
    },
    "Psolution": {
        "numericalResult",
        "result"
    },
    "Rlang": r"^(en|es|de)$",
    "Rlink": r"^.{8,255}$",
    "Rvideo": r"^(True|False)$",
    "Uemail": r'^[A-Za-z0-9._%\-]{8,64}@gmail\.com$',
    "Uhashpass": r"^.{8,64}$",
    "Uid": r"^\d+$",
    "Uname": r'^[a-zA-Z0-9_-]{4,32}$'
}

# MASTER SUPERGLOBALS -> PERMISSIONS
PER = {
    "concept": {
        "create": 255
    },
    "organisation": {
        "create": 1,
        "join": 0
    },
    "problem": {
        "create": 255
    },
    "resource": {
        "create": 1
    },
    "session": {
        "refresh": 0
    },
    "user": {
        "delete": 0,
        "ban": 255
    }
}

# MASTER SUPERGLOBALS -> ERROR CODES
ERR = [
    {"status_code": 400, "detail": "Bad request"},
    {"status_code": 400, "detail": "Bad request"},
    {"status_code": 403, "detail": "Forbidden"}
]