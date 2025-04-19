/*                                                                           */
/* URL PARAMETERS                                                            */
/*                                                                           */

// URL PARAMETERS -> GET
function getURLParameter(request) {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(request);
}


/*                                                                           */
/* API                                                                       */
/*                                                                           */

// API -> REQUEST
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

// API -> VERIFICATION
function verify() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        if (cookie.trim().split('=')[0] === 'session') {
            return true;
        }
    }
    return false;
}


/*                                                                           */
/* GENERAL                                                                   */
/*                                                                           */

// GENERAL -> REDIRECT
function redirect(target) {
    window.location.href = `./${target}`
}

// GENERAL -> ASPECT RATIO
window.addEventListener("resize", function() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const currentPage = window.location.pathname.split("/").pop();
    if (aspectRatio < 3 / 2 && currentPage !== "error.php") {
        window.location.href = "error.php";
    }
});