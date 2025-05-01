import math
import random

k = 1.2

def newElo(pastElo, score, deptavg):
    diff = (score - deptavg) / deptavg
    new = math.log(pastElo, k) + diff
    return round(math.pow(k, new))

# 0 GAP MEANS JUST THE ONE ABOVE.
# 1 GAP MEANS ONE EMPTY POSITION IN BETWEEN
# ONE BELOW TRIES TO SWITCH TO EVERY SINGLE ONE ABOVE

def switch(below, above, gap = 0):
    diff = below / above - (1 / (gap + 1))
    if random.random() <= diff:
        return True
    else:
        return False

print(switch(33, 39, gap = -1))