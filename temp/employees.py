import math
import random

k = 1.2

def newElo(pastElo, score, deptavg):
    diff = (score - deptavg) / deptavg
    new = math.log(pastElo, k) + diff
    return round(math.pow(k, new))

def switch(below, above, gap = 0):
    diff = below / above - (1 / (gap + 1))
    if random.random() <= diff:
        return True
    else:
        return False

print(switch(17, 66, gap=3))