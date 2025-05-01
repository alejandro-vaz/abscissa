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
def database_request(query: str, params: list = []) -> object:
    placeholders = []
    pattern = compile(r"(!|\?)")
    for m in pattern.finditer(query):
        placeholders.append((m.group(1), m.start(), m.end()))
    new_query_parts = []
    last = 0
    val_params = []
    p_index = 0
    for ph_type, start, end in sorted(placeholders, key=lambda x: x[1]):
        new_query_parts.append(query[last:start])
        if ph_type == "!":
            ident = params[p_index]
            p_index += 1
            if not match(r"^[A-Za-z0-9_]+$", ident):
                raise ValueError(f"Invalid identifier: {ident}")
            new_query_parts.append(f"`{ident}`")
        else:
            new_query_parts.append("?")
            val_params.append(params[p_index])
            p_index += 1
        last = end
    new_query_parts.append(query[last:])
    final_query = ''.join(new_query_parts)
    cursor = SUG.THR.DBS.cursor(prepared=True)
    cursor.execute(final_query, val_params)
    if cursor.with_rows:
        cols = [col[0] for col in cursor.description]
        rows = [dict(zip(cols, row)) for row in cursor.fetchall()]
        cursor.close()
        return rows
    cursor.close()
    return True

# ACCESS -> VALIDATION
def database_validate() -> bool:
    if database_request(
        "SELECT session, username, expires, ip FROM sessions WHERE session = ?",
        [
            SUG.THR.SID
        ]
    ):
        return True
    else:
        return False


#
#   SESSIONS
#

# SESSIONS -> GENERATE
def gensession() -> str:
    return token_hex(16)

# SESSIONS -> SET
def setsession(response: object, session: str, un: str) -> None:
    if database_request(
        "INSERT INTO sessions (session, username, expires, ip) VALUES (?, ?, ?, ?)",
        [
            session,
            un,
            (datetime.now() + timedelta(hours=20)).strftime("%Y-%m-%d %H:%M:%S"),
            SUG.THR.REQ.META.get('REMOTE_ADDR')
        ]
    ):
        response.set_cookie(
            'session',
            session,
            max_age=72000,
            path='/',
            secure=True,
            httponly=True,
            samesite='Lax'
        )


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def database_init() -> None:
    SUG.THR.DBS = connect(
        host = SUG.DBS["HOST"],
        user = SUG.DBS["USER"],
        password = SUG.DBS["PASSWORD"],
        database = SUG.DBS["DATABASE"]
    )
    SUG.THR.DBS.autocommit = True