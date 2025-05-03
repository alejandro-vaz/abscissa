#
#   HANDLER
#

# HANDLER -> LOAD
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   HELPERS
#

# HELPERS -> KEY TO BYTES
def key2bytes(key: str) -> bytes:
    crypt = sha256.new()
    crypt.update(key.encode('utf-8'))
    return crypt.digest()

# HELPERS -> CRC32 DATE
def crc32date() -> int:
    return zlib.crc32(datetime.now().strftime('%Y-%m-%d').encode()) & 0xFFFFFFFF


#
#   CODIFICATION
#

# CODIFICATION -> ENCRYPT
def encrypt(data: str, key: str) -> str:
    vector = get_random_bytes(aes.block_size)
    return base64.b64encode(
        vector + aes.new(
            key2bytes(key), aes.MODE_CBC, vector
        ).encrypt(pad(data.encode('utf-8'), aes.block_size))
    ).decode('utf-8')

# CODIFICATION -> DECRYPT
def decrypt(cipher: str, key: str) -> str:
    raw = base64.b64decode(cipher)
    return unpad(
        aes.new(
            key2bytes(key), aes.MODE_CBC, raw[:aes.block_size]
        ).decrypt(raw[aes.block_size:]), aes.block_size
    ).decode('utf-8')


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def cryptography_init() -> None:
    pass