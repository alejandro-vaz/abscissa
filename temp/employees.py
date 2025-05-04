import math
import random

# 1.2 for minor, 1.5 for major
k = 1.2

# USE IT
# INSIDE DEPARTMENT, SCORES ARE EVALUATED INDEPENDENTLY
# IF HEAD OF BIDEPARTMENT, NEWELO IS SUM OF DEPARTMENT ELOS
# TO SWITCH HEAD OF BIDEPT. ELO OF TWO PEOPLE COMBINED OF THE TWO DEPT. ARE SUMMED AND THEN USED WITH SWITCH FORMULA

def newElo(pastElo, score, deptavg):
    diff = (score - deptavg) / deptavg
    new = math.log(pastElo, k) + diff
    fin = round(math.pow(k, new))
    if fin < 5:
        return 5
    return fin

# 0 GAP MEANS JUST THE ONE ABOVE.
# 1 GAP MEANS ONE EMPTY POSITION IN BETWEEN
# ONE BELOW TRIES TO SWITCH TO EVERY SINGLE ONE ABOVE

def switch(below, above, gap = 0):
    diff = below / above - (1 / (gap + 1))
    if random.random() <= diff:
        return True
    else:
        return False

print(newElo(160, 10, 38 / 6))