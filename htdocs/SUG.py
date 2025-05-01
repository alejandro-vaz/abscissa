# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# THREAD SUPERGLOBALS
THR = threading.local()
THR.REQ = None
THR.PST = None

# MASTER SUPERGLOBALS
