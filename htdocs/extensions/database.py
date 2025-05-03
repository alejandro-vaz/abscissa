#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   ACCESS
#

# ACCESS -> FUNCTION
def database_request(query: str, params: list) -> object:
    placeholders = []
    pattern = compile(r"(!|\?)")
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
            if not match(r"^[A-Za-z0-9_]+$", ident):
                raise DatabaseQueryError(query)
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
        cols = [col[0] for col in cursor.description]
        rows = [dict(zip(cols, row)) for row in cursor.fetchall()]
        cursor.close()
        return rows
    cursor.close()
    return True


#
#   SESSIONS
#

# SESSIONS -> GENERATE
def gensession() -> str:
    return token_hex(16)

# SESSIONS -> SET
def setsession(session: str, username: str) -> None:
    database_request(
        "INSERT INTO sessions (session, username, expires, ip) VALUES (?, ?, ?, ?)",
        [
            session,
            username,
            (datetime.now() + timedelta(seconds=72000)).strftime("%Y-%m-%d %H:%M:%S"),
            SUG.THR.REQ.META.get('REMOTE_ADDR')
        ]
    )


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def database_init() -> None:
    try:
        SUG.THR.DBS = connect(
            host = SUG.DBS["HOST"],
            user = SUG.DBS["USER"],
            password = SUG.DBS["PASSWORD"],
            database = SUG.DBS["DATABASE"]
        )
    except:
        raise DatabaseConnectionError(
            SUG.DBS["DATABASE"], 
            SUG.DBS["USER"], 
            SUG.DBS["HOST"], 
            SUG.DBS["PASSWORD"]
        )
    SUG.THR.DBS.autocommit = True
    SUG.THR.DBV = bool(database_request(
        "SELECT session, username, expires, ip FROM sessions WHERE session = ?",
        [
            SUG.THR.SID
        ]
    ))