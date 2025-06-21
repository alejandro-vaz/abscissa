#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# HANDLER -> MODULES
import datetime
import json
import mysql.connector as mysql


#
#   ACCESS
#

# ACCESS -> FUNCTION
def request(query: str, params: list) -> object:
    for index in range(len(params)):
        par = params[index]
        if isinstance(par, (list, dict)):
            params[index] = json.dumps(par)
    placeholders = []
    pattern = re.compile(r"(!|\?)")
    for mark in pattern.finditer(query):
        placeholders.append((mark.group(1), mark.start(), mark.end()))
    queryParts = []
    last = 0
    val_params = []
    pIndex = 0
    for markType, start, end in sorted(placeholders, key=lambda x: x[1]):
        queryParts.append(query[last:start])
        if markType == "!":
            ident = params[pIndex]
            pIndex += 1
            if not re.match(r"^[A-Za-z0-9_]+$", ident):
                raise DatabaseQueryError(query = query)
            queryParts.append(f"`{ident}`")
        else:
            queryParts.append("?")
            val_params.append(params[pIndex])
            pIndex += 1
        last = end
    queryParts.append(query[last:])
    final_query = ''.join(queryParts)
    cursor = SUG.THR.DBS.cursor(prepared=True)
    cursor.execute(final_query, val_params)
    if cursor.with_rows:
        rows = [dict(zip([col[0] for col in cursor.description], row)) for row in cursor.fetchall()]
        cursor.close()
        return rows
    cursor.close()
    return True


#
#   SESSIONS
#

# SESSIONS -> SET
def session(Sid: bytes, Uid: int) -> None:
    request(
        "UPDATE SESSIONS SET Sid = ?, Sip = ?, Sexpires = ? WHERE Uid = ?",
        [
            Sid,
            SUG.REQ.SIP,
            (datetime.now() + datetime.timedelta(seconds=604800)).strftime("%Y-%m-%d %H:%M:%S"),
            Uid
        ]
    )


#
#   INITIALIZATION
#

# INITIALIZATION -> PROCESS
try:
    SUG.THR.DBS = mysql.connect(
        host = SUG.DBC["HOST"],
        user = SUG.DBC["USER"],
        password = SUG.DBC["PASSWORD"],
        database = SUG.DBC["DATABASE"]
    )
except:
    raise DatabaseConnectionError(
        name = SUG.DBC["DATABASE"], 
        user = SUG.DBC["USER"], 
        host = SUG.DBC["HOST"], 
        password = SUG.DBC["PASSWORD"]
    )
SUG.THR.DBS.autocommit = True
SUG.THR.DBV = bool(request(
    "SELECT * FROM SESSIONS WHERE Sid = ?",
    [
        SUG.REQ.SID
    ]
))
if SUG.THR.DBV: 
    SUG.THR.UDT = request(
        "SELECT * FROM USERS WHERE Uid = ?",
        [
            request(
                "SELECT Uid FROM SESSIONS WHERE Sid = ?",
                [
                    SUG.REQ.SID
                ]
            )[0]["Uid"]
        ]
    )[0]