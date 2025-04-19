// FUNCTION TO GET PARAMETERS
function getURLParameter(request) {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(request);
}

// FUNCTION TO GET COOKIES
function getCookie(name) {
    try {
        const cookie = JSON.parse(decodeURIComponent(document.cookie.split(";").find(data => data.trim().startsWith(name + "=")).split("=")[1]));
    } catch (exception) {
        return false;
        // COOKIE NOT FOUND
    }
    let fields;
    switch (name) {
        case "user": {
            fields = ["user", "insight"];
            break;
        }
        default:{
            return false;
            // THROW EXCEPTION, COOKIE DOESN'T HAVE TEMPLATE
        }
    }
    const keys = Object.keys(cookie);
    const matches = keys.length === fields.length && keys.sort().every((key, index) => key === fields.sort()[index]);
    if (matches) {
        return cookie
    } else {
        return false;
        // THROW ANOTHER ERROR, FIELDS AND COOKIE DON'T MATCH
    }
}

// // FUNCTION TO PUSH COOKIE
// function pushCookie(dict, cookieName="cookie") {
//     const cookieRaw = encodeURIComponent(JSON.stringify(dict));
//     document.cookie = `${cookieName}=` + cookieRaw + "; path=/";
// }

// FUNCTION TO FETCH FROM DATABASE API
function curl(script, data) {
    const path = `../database/${script}.php`;
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

// DO NOT ALLOW VERTICAL SCREENS NOR SQUARES
window.addEventListener("resize", function() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const currentPage = window.location.pathname.split("/").pop();
    if (aspectRatio < 3 / 2 && currentPage !== "error.php") {
        window.location.href = "error.php";
    }
});