//                                                                            
//  WINDOW                                                            
//                                                                            

// URL PARAMETERS -> GET
const PAR = Object.fromEntries(new URLSearchParams(window.location.search).entries());

// WINDOW -> REDIRECT
function redirect(target) {
    window.location.href = `${target}`
}

// WINDOW -> FORCE ASPECT RATIO
window.addEventListener("resize", function() {
    if (window.innerWidth / window.innerHeight < 3 / 2 && window.location.pathname.split("/").pop() !== "error") {
        redirect("error");
    }
});


//                                                                            
//  API                                                                       
//                                                                            

// API -> REQUEST
function curl(script, data, timeout = 2000) {
    const path = `api/${script}`;
    const scheme = window.location.protocol === "https:" ? 'https' : 'http';
    const host = window.location.host;
    const scriptDir = window.location.pathname.substring(
        0, 
        window.location.pathname.lastIndexOf('/')
    );
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
        return response.json();
    });
}


//
//  REACT
//

// REACT -> APPEND CONTENT
function inject(element, content) {
    ReactDOM.creteRoot(element).render(content);
}


//
//  ELEMENTS
//

function connect(id) {
    return document.getElementById(id);
}