# IMPORT COMMON MODULES
import math
import cmath

# IMPORT THIRD-PARTY MODULES
import scipy

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