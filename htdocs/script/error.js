// CONNECT TO ELEMENTS
const errorMessage = document.getElementById("mainError");
const errorHeader = document.getElementById("mainHeader");

// DEFINE VARIABLES
const errorCode = getURLParameter("errorCode")

// DECIDE CODE
errorHeader.innerText = errorCode;

// DECIDE MESSAGE
let message;
switch (+errorCode) {
    case 400:
        message = "That means: bad request.";
        break;
    case 401:
        message = "That means: unauthorized.";
        break;
    case 403:
        message = "That means: forbidden.";
        break;
    case 404:
        message = "That means: not found.";
        break;
    case 500:
        message = "That means: internal server error.";
        break;
    case 503:
        message = "That means: service unavailable.";
        break;
    default:
        message = "Unknown error.";
        break;
}

// PRINT MESSAGE 
errorMessage.innerText = message;