#
#   HANDLER
#

# HANDLER -> LOAD
from website import *

# HANDLER -> MODULES
import datetime
import zlib


#
#   TIME
#

# TIME -> NOW
def now() -> str:
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')


#
#   INITIALIZATION
#

# INITIALIZATION -> FUNCTION
def init() -> None:
    SUG.THR.D32 = zlib.crc32(datetime.datetime.now().strftime('%Y-%m-%d').encode()) & 0xFFFFFFFF