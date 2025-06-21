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

# INITIALIZATION -> PROCESS
SUG.THR.D32 = zlib.crc32(datetime.datetime.now().strftime('%Y-%m-%d').encode()) & 0xFFFFFFFF