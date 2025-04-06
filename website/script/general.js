// FUNCTION TO GET PARAMETERS
function gup(request) {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(request);
}

// FUNCTION TO GET COOKIES
function gc(dictKey) {
    cookieName = "cookie"
    // Split document.cookie into individual cookies and find the one that starts with the cookieName
    const cookieStr = document.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith(cookieName + "="));
    
    if (!cookieStr) {
        return null;
    }
    
    // Get the cookie value part
    const cookieValue = cookieStr.split("=")[1];
    
    try {
      // Decode and parse the JSON string
        const decoded = decodeURIComponent(cookieValue);
        const jsonObj = JSON.parse(decoded);
      // Return the requested dictionary value
        return jsonObj[dictKey] !== undefined ? jsonObj[dictKey] : null;
    } catch (e) {
        console.error("Error decoding or parsing cookie:", e);
        return null;
    }
}

// COOKIES
const cookieRaw = {
    userName: "John",
    userInsight: 300
}
const cookieValue = encodeURIComponent(JSON.stringify(cookieRaw));
document.cookie = "cookie=" + cookieValue + "; path=/"