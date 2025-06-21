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
    from extensions import bools, database, post
    
    # DECLARATION -> ARGUMENT CHECKS
    if not post.checks("Ken", "Kes", "Kde"): return SUG.REQ.RES.error(1)
    
    # DECLARATION -> ARGUMENT RELATIONSHIP
    if not bools.count(post.exists("Ken"), post.exists("Kes"), post.exists("Kde")) == 1: return SUG.REQ.RES.error(2)
    
    # DECLARATION -> QUERY
    string = next(lang for lang in ["Ken", "Kes", "Kde"] if post.exists(lang))
    SUG.REQ.RES.write(database.request(
        f"SELECT * FROM CONCEPTS WHERE {string} LIKE ?",
        [
            "%" + SUG.REQ.PST[string.split(" ")[0]] + "%",
        ]
    ))
    return SUG.REQ.RES.get()