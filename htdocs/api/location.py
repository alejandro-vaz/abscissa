#
#   INIT
#

# INIT -> HANDLER
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from handler import *

# INIT -> EXTENSIONS
from extensions.database import *
from extensions.post import *
from extensions.response import *


#
#   FUNCTION
#

# FUNCTION -> DECLARATION
@csrf_exempt
def output(request: object) -> object:
    # FUNCTION -> SUPERGLOBALS
    SUG.THR.REQ = request
    SUG.THR.SID = SUG.THR.REQ.COOKIES.get('session')
    
    # FUNCTION -> ACTIVATION
    database_init()
    post_init()
    response_init()
    
    # FUNCTION -> ARGUMENT CHECKS
    check("LANG")
    check("PROBLEM")
    check("NODE")
    check("CLUSTER")
    
    # FUNCTION -> ARGUMENT RELATIONSHIP
    if not (isx("LANG") and (isx("PROBLEM") ^ isx("NODE") ^ isx("CLUSTER"))):
        raise Error()

    # FUNCTION -> TYPES OF QUERIES
    if isx("PROBLEM"):
        problemsQuery = database_request(
            "SELECT node, ! FROM problems WHERE problem = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                SUG.THR.PST["PROBLEM"]
            ]
        )[0]
        nodesQuery = database_request(
            "SELECT cluster, ! FROM nodes WHERE node = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                problemsQuery['node']
            ]
        )[0]
        clustersQuery = database_request(
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                nodesQuery['cluster']
            ]
        )[0]
        treesQuery = database_request(
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = SUG.THR.PST["PROBLEM"]
        problemName = problemsQuery["name_" + SUG.THR.PST["LANG"]]
        nodeValue = problemsQuery['node']
        nodeName = nodesQuery["name_" + SUG.THR.PST["LANG"]]
        clusterValue = nodesQuery['cluster']
        clusterName = clustersQuery["name_" + SUG.THR.PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + SUG.THR.PST["LANG"]]
    elif isx("NODE"):
        nodesQuery = database_request(
            "SELECT cluster, ! FROM nodes WHERE node = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                SUG.THR.PST["NODE"]
            ]
        )[0]
        clustersQuery = database_request(
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                nodesQuery['cluster']
            ]
        )[0]
        treesQuery = database_request(
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = None
        problemName = None
        nodeValue = SUG.THR.PST["NODE"]
        nodeName = nodesQuery["name_" + SUG.THR.PST["LANG"]]
        clusterValue = nodesQuery['cluster']
        clusterName = clustersQuery["name_" + SUG.THR.PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + SUG.THR.PST["LANG"]]
    elif isx("CLUSTER"):
        clustersQuery = database_request(
            "SELECT tree, ! FROM clusters WHERE cluster = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                SUG.THR.PST["CLUSTER"]
            ]
        )[0]
        treesQuery = database_request(
            "SELECT ! FROM trees WHERE tree = ?",
            [
                "name_" + SUG.THR.PST["LANG"],
                clustersQuery['tree']
            ]
        )[0]
        problemValue = None
        problemName = None
        nodeValue = None
        nodeName = None
        clusterValue = SUG.THR.PST["CLUSTER"]
        clusterName = clustersQuery["name_" + SUG.THR.PST["LANG"]]
        treeValue = clustersQuery['tree']
        treeName = treesQuery["name_" + SUG.THR.PST["LANG"]]
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
    return set_response(result)