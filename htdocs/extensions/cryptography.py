#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   HELPERS
#

# HELPERS -> KEY TO BYTES
def key2bytes(key_str: str) -> bytes:
    h = sha256.new()
    h.update(key_str.encode('utf-8'))
    return h.digest()

# HELPERS -> CRC32 DATE
def crc32date() -> int:
    date_str = datetime.now().strftime('%Y-%m-%d')
    crc_signed = zlib.crc32(date_str.encode())
    crc_unsigned = crc_signed & 0xFFFFFFFF
    return crc_unsigned


#
#   CODIFICATION
#

# CODIFICATION -> ENCRYPT
def encrypt(data: str, key: str) -> str:
    key_bytes = key2bytes(key)
    iv = get_random_bytes(aes.block_size)
    cipher = aes.new(key_bytes, aes.MODE_CBC, iv)
    padded = pad(data.encode('utf-8'), aes.block_size)
    ct = cipher.encrypt(padded)
    return base64.b64encode(iv + ct).decode('utf-8')

# CODIFICATION -> DECRYPT
def decrypt(enc: str, key: str) -> str:
    key_bytes = key2bytes(key)
    raw = base64.b64decode(enc)
    iv = raw[:aes.block_size]
    ct = raw[aes.block_size:]
    cipher = aes.new(key_bytes, aes.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct), aes.block_size)
    return pt.decode('utf-8')


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def cryptography_init() -> None:
    pass