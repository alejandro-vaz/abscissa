#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> EXTENSIONS
from extensions.base36 import *
from extensions.bool import *
from extensions.cryptography import *
from extensions.database import *
from extensions.post import *
from extensions.random import *
from extensions.response import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
def output(request: object) -> object:
    # FUNCTION -> SUPERGLOBALS
    SUG.THR.REQ = request
    
    # FUNCTION -> ACTIVATION
    base36_init()
    bool_init()
    cryptography_init()
    database_init()
    post_init()
    random_init()
    response_init()
    
    # FUNCTION -> ARGUMENT CHECKS
    check("CONTEXT", values = ["day", "random"])
    check("LANG", values = SUG.LAN)
    check("NODE")
    check("PROBLEM")
    
    # FUNCTION -> ARGUMENT RELATIONSHIP
    if not isx("LANG"):
        raise IncorrectArgumentInputError(PST = SUG.THR.PST)
    if count(isx("CONTEXT"), isx("PROBLEM"), isx("NODE")) != 1:
        raise IncorrectArgumentInputError(PST = SUG.THR.PST)
    
    # FUNCTION -> TYPES OF QUERIES
    if isx("PROBLEM"):
        result = database_request(
            "SELECT * FROM problems WHERE problem = ? AND ? IS NOT NULL",
            [
                b36decode(SUG.THR.PST["PROBLEM"]),
                "data_" + SUG.THR.PST["LANG"]
            ]
        )[0]
        result["problem"] = b36encode(result["problem"], 6)
        result["node"] = b36encode(result["node"], 4)
    elif isx("NODE"):
        result = database_request(
            "SELECT * FROM problems WHERE node = ? AND ? IS NOT NULL",
            [
                b36decode(SUG.THR.PST["NODE"]),
                "data_" + SUG.THR.PST["LANG"]
            ]
        )
        for problem in result:
            problem["problem"] = b36encode(problem["problem"], 6)
            problem["node"] = b36encode(problem["node"], 4)
    else:
        if SUG.THR.PST["CONTEXT"] == "day":
            result = database_request(
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    crc32date() % int(database_request(
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]["total"])
                ]
            )[0]
            result["problem"] = b36encode(result["problem"], 6)
            result["node"] = b36encode(result["node"], 4)
        else:
            result = database_request(
                "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
                [
                    "data_" + SUG.THR.PST["LANG"],
                    random.randomint(0, int(database_request(
                        "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                        [
                            "data_" + SUG.THR.PST["LANG"]
                        ]
                    )[0]['total']) - 1)
                ]
            )[0]
            result["problem"] = b36encode(result["problem"], 6)
            result["node"] = b36encode(result["node"], 4)
    return set_response(result)