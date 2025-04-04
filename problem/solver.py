# IMPORT COMMON MODULES
from decimal import Decimal as d
from decimal import getcontext
import math as m
import cmath as cm

# IMPORT THIRD-PARTY MODULES
import scipy as sp
import numpy as np

# SET 32 DIGIT PRECISSION
getcontext().prec = 32

# MAIN LOOP
while True:
    argument = input(">>> ")
    try:
        print("==> " + str(eval(argument)))
    except Exception as e1:
        try:
            exec(argument)
        except Exception as e2:
            print("=/> " + str(e1) + ";;" + str(e2))