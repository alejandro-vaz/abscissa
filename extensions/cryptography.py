#
#   HANDLER
#

# HANDLER -> FUTURE
from __future__ import annotations

# HANDLER -> LOAD
from website import *


#
#   CRYPTOGRAPHY
#

# CRYPTOGRAPHY -> MODULES
import argon2

# CRYPTOGRAPHY -> CLASS
class namespace:
    # CLASS -> VARIABLES
    hasher: argon2.PasswordHasher
    # CLASS -> INIT
    async def init(self, request: Request) -> namespace: 
        self.hasher = argon2.PasswordHasher()
        return self
    # CLASS -> HASH
    def hash(self, password: str) -> str:
        return self.hasher.hash(password)
    # CLASS -> VERIFY
    def verify(self, code: str, password: str) -> bool:
        try: return self.hasher.verify(code, password)
        except: return False