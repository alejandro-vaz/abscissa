from scipy.special import lambertw
import math
import cmath

while True:
    argument = input(">>> ")
    try:
        print("==> " + str(eval(argument)))
    except Exception as e1:
        try:
            exec(argument)
        except Exception as e2:
            print("=/> " + str(e1) + ";;" + str(e2))