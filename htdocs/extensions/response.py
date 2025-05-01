# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from handler import *

def craftResponse(jsonData):
    response = HTTP.JsonResponse(jsonData, status=200, safe=False)
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response

def response_init():
    pass