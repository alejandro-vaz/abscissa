#
#   HANDLER
#

# HANDLER -> LOAD
from website import *

# HANDLER -> MODULES
import datetime
import json
import mysql.connector as sql


#
#   ACCESS
#

# ACCESS -> FUNCTION
def request(query: str, parameters: list) -> list | bool:
    for index in range(len(parameters)):
        parameter = parameters[index]
        if isinstance(parameter, (list, dict)):
            parameters[index] = json.dumps(parameter)
    placeholders = []
    for mark in re.compile(r"(!|\?)").finditer(query):
        placeholders.append((mark.group(1), mark.start(), mark.end()))
    queryParts = []
    position = 0
    values = []
    counter = 0
    for markType, start, end in sorted(placeholders, key=lambda x: x[1]):
        queryParts.append(query[position:start])
        if markType == "!":
            ident = parameters[counter]
            queryParts.append(f"`{ident}`")
        else:
            queryParts.append("?")
            values.append(parameters[counter])
        counter += 1
        position = end
    queryParts.append(query[position:])
    cursor = SUG.THR.DBS.cursor(prepared=True)
    cursor.execute(''.join(queryParts), values)
    if cursor.with_rows:
        rows = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
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
            (datetime.datetime.now() + datetime.timedelta(seconds=604800)).strftime("%Y-%m-%d %H:%M:%S"),
            Uid
        ]
    )


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None:
    SUG.THR.DBS = sql.connect(
        host = SUG.DBC["HOST"],
        user = SUG.DBC["USER"],
        password = SUG.DBC["PASSWORD"],
        database = SUG.DBC["DATABASE"]
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