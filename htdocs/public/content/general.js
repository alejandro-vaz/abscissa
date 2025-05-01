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
function curl(script, data, timeout = 2500) {
    const path = `api/${script}`;
    const scheme = window.location.protocol === "https:" ? 'https' : 'http';
    const host = window.location.host;
    const scriptDir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const url = `${scheme}://${host}${scriptDir}/${path.replace(/^\/+/, '')}`;
    const signal = AbortSignal.timeout(timeout);
    return fetch(url, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    });
}

// API -> SESSION VALIDATION
function validate() {
    return curl("auth", {
        "CONTEXT": "validate"
    })
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
    if (aspectRatio < 3 / 2 && currentPage !== "error") {
        window.location.href = "error";
    }
});

