# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from handler import *

def database_connect(host: str, user: str, password: str, database: str) -> MySQLConnection:
    db = connect(
        host=host,
        user=user,
        password=password,
        database=database
    )
    db.autocommit = True
    return db

import re
from mysql.connector import MySQLConnection


def database_request(conn: MySQLConnection, query: str, params: list = []):
    """
    Extended database_request supporting two placeholder types:
      - `!` marks an identifier placeholder (column or table name). Its param
        will be inlined (without quotes) after whitelist validation.
      - `?` marks a data-value placeholder, bound safely by the prepared cursor.

    Placeholders must appear in the SQL string as literal `!` or `?` characters.
    Example:
      database_request(
          conn,
          "SELECT * FROM problems WHERE ! IS NOT NULL LIMIT ?, 1",
          ["data_en", offset]
      )
    """
    # Validate and split placeholders
    placeholders = []  # list of (type, start, end)
    pattern = re.compile(r"(!|\?)")
    for m in pattern.finditer(query):
        placeholders.append((m.group(1), m.start(), m.end()))

    # Rebuild query with identifiers inlined, collect only value params
    new_query_parts = []
    last = 0
    val_params = []
    p_index = 0
    # Process in order of appearance
    for ph_type, start, end in sorted(placeholders, key=lambda x: x[1]):
        # append SQL between placeholders
        new_query_parts.append(query[last:start])
        if ph_type == "!":
            # Inline identifier, whitelist check
            ident = params[p_index]
            p_index += 1
            if not re.match(r"^[A-Za-z0-9_]+$", ident):
                raise ValueError(f"Invalid identifier: {ident}")
            new_query_parts.append(f"`{ident}`")
        else:  # ph_type == '?'
            # Keep ? for prepared binding
            new_query_parts.append("?")
            val_params.append(params[p_index])
            p_index += 1
        last = end
    new_query_parts.append(query[last:])
    final_query = ''.join(new_query_parts)

    # Execute with prepared cursor (qmark style)
    cursor = conn.cursor(prepared=True)
    cursor.execute(final_query, val_params)

    # Return rows or True
    if cursor.with_rows:
        cols = [col[0] for col in cursor.description]
        rows = [dict(zip(cols, row)) for row in cursor.fetchall()]
        cursor.close()
        return rows
    cursor.close()
    return True



def gensession() -> str:
    return token_hex(16)  # 16 bytes → 32-char hex :contentReference[oaicite:9]{index=9}

def setsession(request, response, session: str, conn, un) -> None:
    if database_request(
        conn,
        "INSERT INTO sessions (session, username, expires, ip) VALUES (?, ?, ?, ?)",
        [
            session,
            un,
            (datetime.now() + timedelta(hours=20)).strftime("%Y-%m-%d %H:%M:%S"),
            request.META.get('REMOTE_ADDR')
        ]
    ):
        response.set_cookie(
            'session',
            session,
            max_age=72000,
            path='/',
            secure=True,
            httponly=True,
            samesite='Lax'    # same as PHP 'lax'
        )  # Django set_cookie docs :contentReference[oaicite:10]{index=10}

def delsession(response) -> None:
    response.delete_cookie(
        'session',
        path='/',
        secure=True,
        httponly=True,
        samesite='Lax'
    )

def database_validate(request, conn) -> bool:
    session_id = request.COOKIES.get('session')
    if not session_id:
        return False

    rows = database_request(
        conn,
        "SELECT session, username, expires, ip FROM sessions WHERE session = ?",
        [
            session_id
        ]
    )
    if rows:
        return True
    return False