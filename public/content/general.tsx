//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import * as ReactDOM from 'react-dom/client';

// HEAD -> VIEWS
import _ from "./&/script.js";
import _dashboard from "./&dashboard/script.js";
import _error from "./&error/script.js";
import _login from "./&login/script.js";
import _register from "./&register/script.js";


//                                                                            
//  WINDOW                                                            
//                                                                            

// WINDOW -> SUPERGLOBALS
export const SUG = {
    PAR: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    get VWD(): string[] {return window.location.pathname.split("/").slice(1)}
}

// WINDOW -> REDIRECT
export async function redirect(target: string): void {
    await view(target);
    history.pushState(null, '', target);
}

// WINDOW -> MANAGER
// @ts-nocheck
async function view(target: string): void {
    switch (SUG.VWD[0]) {
        case "_": window._.remove();
        case "dashboard": window._dashboard.remove();
        case "error": window._error.remove();
        case "login": window._login.remove();
        case "register": window._register.remove();
    }
    switch (target.split("/")[1]) {
        case '': await _();
        case 'dashboard': await _dashboard();
        case 'error': await _error();
        case 'login': await _login();
        case 'register': await _register();
    }
}

// WINDOW -> VIEW LOADER
document.addEventListener('DOMContentLoaded', () => {
    view(window.location.pathname);
})

// WINDOW -> BUTTON NAVIGATION
window.addEventListener('popstate', () => {
    view(window.location.pathname);
})

// WINDOW -> VERTICAL SCREEN ERROR
window.addEventListener("resize", function(): void {
    if (
        window.innerWidth / window.innerHeight < 3 / 2 && 
        SUG.VWD[0] !== 'error' && SUG.VWD[1] !== '0'
    ) {
        redirect("/error/0");
    } else if (
        window.innerWidth / window.innerHeight >= 3 / 2 && 
        SUG.VWD[0] === 'error' && SUG.VWD[1] === '0'
    ) {
        redirect("/dashboard");
    }
});

// WINDOW -> NO CONTEXTMENU
document.addEventListener("contextmenu", (open) => {
    open.preventDefault();
})


//                                                                            
//  API                                                                       
//                                                                            

// API -> REQUEST
export async function curl(script: string, data: object, timeout = 5000): Promise<object | boolean | string | number | null> {
    return (await fetch(
        ("https://") +
        (window.location.host) +
        ("/api/") +
        (script.replace(/^\/+/, '')),
        {
            cache: "no-store",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(timeout)
        }
    )).json();
}


//
//  ELEMENTS
//

// ELEMENTS -> CONNECTIONS
export function connect(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element) {
        return element
    } else {
        throw new Error(`Could not connect to ${id}`)
    }
}

// ELEMENTS -> REPLACE CONTENT
export function inject(element: HTMLElement, content: ReactNode): void {
    ReactDOM.createRoot(element).render(content);
}

// ELEMENTS -> APPEND CONTENT
export function append(element: HTMLElement, content: ReactNode): void {
    const container = document.createElement('div');
    inject(container, content)
    element.innerHTML = element.innerHTML + container.innerHTML;
}


//
//  DEBUG
//

// DEBUG -> FUNCTION
export function debug(...variables: []) {
    for (const variable of variables) {
        console.warn(`DEBUG: ${variable}`)
    }
}