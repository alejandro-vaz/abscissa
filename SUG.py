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
DIR = "/srv/www/abscissa"

# MASTER SUPERGLOBALS -> ERROR CODES
ERR = [
    {"status_code": 400, "detail": "Bad request"},
    {"status_code": 403, "detail": "Forbidden"},
    {"status_code": 422, "detail": "Unprocessable"}
]