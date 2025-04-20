import math

def merge(subs):
    summation = 0
    for number in subs:
        summation += math.sqrt(number) / len(subs)
    return math.floor(math.pow(summation, 2))

def level(xp):
    return math.floor(math.log(xp))