// FUNCTION TO GET PARAMETERS
function getURLParameter(request) {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(request);
}

// FUNCTION TO GET COOKIES
function getCookie(dictKey, cookieName="cookie") {
    const cookieStr = document.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith(cookieName + "="));
    const cookieValue = cookieStr.split("=")[1];
    const decoded = decodeURIComponent(cookieValue);
    const jsonObj = JSON.parse(decoded);
    return jsonObj[dictKey] !== undefined ? jsonObj[dictKey] : null;
}

// FUNCTION TO PUSH COOKIE
function pushCookie(dict, cookieName="cookie") {
    const cookieRaw = encodeURIComponent(JSON.stringify(dict));
    document.cookie = `${cookieName}=` + cookieRaw + "; path=/";
}

// FUNCTION TO FETCH FROM DATABASE API
function fetchAPI(URL) {
    return fetch(`../database/${URL}`, { cache: "no-store" }).then(response => response.json());
}

// COOKIES
const data = {
    userName: "John",
    userInsight: 300
}
pushCookie(data)