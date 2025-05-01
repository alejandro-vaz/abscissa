#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *


#
#   THREAD SUPERGLOBALS
#

# THREAD SUPERGLOBALS -> CONTAINER
THR = threading.local()

# THREAD SUPERGLOBALS -> REQUEST
THR.REQ = None

# THREAD SUPERGLOBALS -> POST
THR.PST = None

# THREAD SUPERGLOBALS -> DATABASE
THR.DBS = None

# THREAD SUPERGLOBALS -> SESSION ID
THR.SID = None


#
#   MASTER SUPERGLOBALS
#

# MASTER SUPERGLOBALS -> DATABASE
DBS = {
    "HOST": "localhost",
    "USER": "phpmyadmin",
    "PASSWORD": "orangepi",
    "DATABASE": "abscissa"
}