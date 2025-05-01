# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from handler import *

def _derive_key(key_str: str) -> bytes:
    """
    Derive a 32-byte key from an arbitrary string using SHA-256.
    This matches PHP if you pass any-length $key into openssl_encrypt.
    """
    h = sha256.new()                # create SHA-256 hash object :contentReference[oaicite:4]{index=4}
    h.update(key_str.encode('utf-8'))
    return h.digest()                # 32-byte digest

def encrypt(data: str, key: str) -> str:
    """
    Encrypts `data` with aes-256-CBC, random IV, and returns
    Base64-encoded (iv + ciphertext).
    """
    key_bytes = _derive_key(key)
    iv = get_random_bytes(aes.block_size)               # 16-byte IV :contentReference[oaicite:5]{index=5}
    cipher = aes.new(key_bytes, aes.MODE_CBC, iv)       # aes-CBC mode :contentReference[oaicite:6]{index=6}
    padded = pad(data.encode('utf-8'), aes.block_size)  # PKCS#7 padding :contentReference[oaicite:7]{index=7}
    ct = cipher.encrypt(padded)
    # Prepend IV and Base64-encode
    return base64.b64encode(iv + ct).decode('utf-8')    # match PHP base64_encode :contentReference[oaicite:8]{index=8}

def decrypt(enc: str, key: str) -> str:
    """
    Reverses `encrypt`: Base64-decode, split IV, decrypt aes-CBC,
    unpad, and return plaintext string.
    """
    key_bytes = _derive_key(key)
    raw = base64.b64decode(enc)                       # reverse base64_encode :contentReference[oaicite:9]{index=9}
    iv = raw[:aes.block_size]                         # extract IV :contentReference[oaicite:10]{index=10}
    ct = raw[aes.block_size:]
    cipher = aes.new(key_bytes, aes.MODE_CBC, iv)     # aes-CBC mode :contentReference[oaicite:11]{index=11}
    pt = unpad(cipher.decrypt(ct), aes.block_size)    # remove PKCS#7 padding :contentReference[oaicite:12]{index=12}
    return pt.decode('utf-8')


def crc32date():
    date_str = datetime.now().strftime('%Y-%m-%d')      # e.g. "2025-04-27"
    crc_signed = zlib.crc32(date_str.encode())          # may be signed on some Python versions :contentReference[oaicite:0]{index=0}
    crc_unsigned = crc_signed & 0xFFFFFFFF               # mask to unsigned 32-bit :contentReference[oaicite:1]{index=1}
    return crc_unsigned

def cryptography_init():
    pass