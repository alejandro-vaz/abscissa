# HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# IMPORTS
from extensions.check import *
from extensions.database import *
from extensions.response import *

@csrf_exempt
def response(request):
    # GET THE INPUT
    PST = getPOST(request)
    
    # CHECK ARGUMENTS
    check(PST, "LANG")
    check(PST, "PROBLEM")
    check(PST, "NODE")
    check(PST, "CLUSTER")
    
    # CHECK ARGUMENT RELATIONSHIPS
    if not (isx(PST, "LANG") and (isx(PST, "PROBLEM") ^ isx(PST, "NODE") ^ isx(PST, "CLUSTER"))):
        raise Error()
    
    # CONNECT TO DATABASE
    database = database_connect('localhost', 'phpmyadmin', 'orangepi', 'abscissa')

    # TYPES OF QUERIES
    if isx(PST, "PROBLEM"):
        problemsQuery = database_request(
            database,
            "SELECT node, ! FROM problems WHERE problem = ?",
            [
                "name_" + PST["LANG"],
                PST["PROBLEM"]
            ]
        )[0]
        nodesQuery = database_request(
            database,
            "SELECT cluster, ! FROM nodes WHERE node = ?",
            [
                "name_" + PST["LANG"],
                problemsQuery['node']
            ]
        )[0]
        clustersQuery = database_request(
            database,
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + PST["LANG"],
                nodesQuery['cluster']
            ]
        )[0]
        treesQuery = database_request(
            database,
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = PST["PROBLEM"]
        problemName = problemsQuery["name_" + PST["LANG"]]
        nodeValue = problemsQuery['node']
        nodeName = nodesQuery["name_" + PST["LANG"]]
        clusterValue = nodesQuery['cluster']
        clusterName = clustersQuery["name_" + PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + PST["LANG"]]
    elif isx(PST, "NODE"):
        nodesQuery = database_request(
            database,
            "SELECT cluster, ! FROM nodes WHERE node = ?",
            [
                "name_" + PST["LANG"],
                PST["NODE"]
            ]
        )[0]
        clustersQuery = database_request(
            database,
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + PST["LANG"],
                nodesQuery['cluster']
            ]
        )[0]
        treesQuery = database_request(
            database,
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = None
        problemName = None
        nodeValue = PST["NODE"]
        nodeName = nodesQuery["name_" + PST["LANG"]]
        clusterValue = nodesQuery['cluster']
        clusterName = clustersQuery["name_" + PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + PST["LANG"]]
    elif isx(PST, "CLUSTER"):
        clustersQuery = database_request(
            database,
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + PST["LANG"],
                PST["CLUSTER"]
            ]
        )[0]
        treesQuery = database_request(
            database,
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = None
        problemName = None
        nodeValue = None
        nodeName = None
        clusterValue = PST["CLUSTER"]
        clusterName = clustersQuery["name_" + PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + PST["LANG"]]
    else:
        raise Error()
    result = {
        "problem": {
            "value": problemValue,
            "name": problemName
        },
        "node": {
            "value": nodeValue,
            "name": nodeName
        },
        "cluster": {
            "value": clusterValue,
            "name": clusterName
        },
        "tree": {
            "value": treeValue,
            "name": treeName
        }
    }
    
    # CRAFT RESPONSE
    response = craftResponse(result)
    
    # RETURN RESPONSE
    return response