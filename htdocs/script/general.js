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
function curl(script, data) {
    path = `../database/${script}`
    const scheme = window.location.protocol === "https:" ? 'https' : 'http';
    const host = window.location.host;
    const scriptDir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const url = `${scheme}://${host}${scriptDir}/${path.replace(/^\/+/, '')}`;
    return fetch(url, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    });
}

// FUNCTION TO REDIRECT
function redirect(target) {
    window.location.href = `./${target}`
}

// FUNCTION TO GET RAW LATEX
function rawLaTeX(latex) {
    return latex
    .replaceAll("\\\\", "\\")
    .replaceAll("\\right", "")
    .replaceAll("\\left", "")
    .replaceAll("\\cdot", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("*", "")
    .replaceAll("\\\\", "")
    .replaceAll(" ", "")
    .trim()
}

// COOKIES
const data = {
    userName: "John",
    userInsight: 300
}
pushCookie(data)

// DO NOT ALLOW VERTICAL SCREENS NOR SQUARES
window.addEventListener("resize", function() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const currentPage = window.location.pathname.split("/").pop();
    if (aspectRatio < 3 / 2 && currentPage !== "error.php") {
        window.location.href = "error.php";
    }
});