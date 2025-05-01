# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# THREAD SUPERGLOBALS
THR = threading.local()
THR.REQ = None
THR.PST = None
THR.DBS = None
THR.SID = None

# MASTER SUPERGLOBALS (ARE NOT MODIFIED BY CODE)
DBS = {
    "HOST": "localhost",
    "USER": "phpmyadmin",
    "PASSWORD": "orangepi",
    "DATABASE": "abscissa"
}