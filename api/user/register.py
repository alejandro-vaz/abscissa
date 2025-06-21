#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
def output(request: object) -> object:
    # DECLARATION -> EXTENSIONS
    from extensions import _
    _.__init__(request)
    from extensions import database, post, time
    
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Uemail", "Uhashpass", "Uname"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not (post.exists("Uemail") and post.exists("Uhashpass") and post.exists("Uname")): return SUG.REQ.RES.error(2)

    # DECLARATION -> QUERY
    SUG.REQ.RES.write(database.request(
        "INSERT INTO USERS (Uname, Uemail, Uhashpass, Ujoined, Uplayground, Usettings, Oid, Urole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            SUG.REQ.PST["Uname"],
            SUG.REQ.PST["Uemail"],
            SUG.REQ.PST["Uhashpass"],
            time.now(),
            {},
            {},
            0,
            0
        ]
    ))
    return SUG.REQ.RES.get()