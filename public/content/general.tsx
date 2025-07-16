//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import React from "react";
import * as ReactDOM from 'react-dom/client';

// HEAD -> VIEWS
import _ from "./&/script.js";
import _dashboard from "./&dashboard/script.js";
import _error from "./&error/script.js";

// HEAD -> APP MODULES

// HEAD -> INTERFACE MODULES
import * as ___navbar from "../modules/interface/navbar/script.js";
import * as ___tooltip from "../modules/interface/tooltip/script.js";
import * as ___topbar from "../modules/interface/topbar/script.js";


//
//  SUPERGLOBALS
//

// SUPERGLOBALS -> DICTIONARY
export const SUG = {
    get VWD(): string[] {return window.location.pathname.split("/").slice(1)},
    AMD: {},
    IMD: {
        navbar: {active: false, module: ___navbar},
        tooltip: {active: false, module: ___tooltip},
        topbar: {active: false, module: ___topbar}
    },
    get TIT(): string {return document.title},
    get DES(): string {return document.querySelector<HTMLMetaElement>('meta[name="description"]').content}
}


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> REDIRECT
export async function redirect(target: string): void {
    await view(target);
    history.pushState(null, '', target);
}

// WINDOW MANAGEMENT -> VIEW MANAGER
async function view(target: string): void {
    switch (SUG.VWD[0]) {
        case "_": window._.remove();
        case "dashboard": window._dashboard.remove();
        default: window._dashboard.remove();
    }
    switch (target.split("/")[1]) {
        case '': await _();
        case 'dashboard': await _dashboard();
        default: await _error();
    }
}

// WINDOW MANAGEMENT -> VIEW LOADER
document.addEventListener('DOMContentLoaded', () => {
    view(window.location.pathname);
})

// WINDOW MANAGEMENT -> BUTTON NAVIGATION
window.addEventListener('popstate', () => {
    view(window.location.pathname);
})

// WINDOW MANAGEMENT -> NO CONTEXTMENU
document.addEventListener("contextmenu", (open) => {
    open.preventDefault();
})

// WINDOW MANAGEMENT -> TITLE
export function setTitle(newTitle: string): void {
    document.title = newTitle;
}

// WINDOW MANAGEMENT -> DESCRIPTION
export function setDescription(newDescription: string): void {
    document.querySelector('meta[name="description"]').setAttribute('content', newDescription);
}


//
//  MODULE MANAGEMENT
//

// MODULE MANAGEMENT -> APP MODULATOR
export async function appModulator(...activate: string[]): Promise<void> {
    const promises = [];
    for (const mod in SUG.AMD) {
        if (SUG.AMD[mod].active && !activate.includes(mod)) {
            promises.push(SUG.AMD[mod].module.deactivate());
            SUG.AMD[mod].active = false;
        } else if (!SUG.AMD[mod].active && activate.includes(mod)) {
            promises.push(SUG.AMD[mod].module.activate());
            SUG.AMD[mod].active = true;
        }
    }
    await Promise.all(promises);
}

// MODULE MANAGEMENT -> INTERFACE MODULATOR
export async function interfaceModulator(...activate: string[]): Promise<void> {
    const promises = [];
    for (const mod in SUG.IMD) {
        if (SUG.IMD[mod].active && !activate.includes(mod)) {
            promises.push(SUG.IMD[mod].module.deactivate());
            SUG.IMD[mod].active = false;
        } else if (!SUG.IMD[mod].active && activate.includes(mod)) {
            promises.push(SUG.IMD[mod].module.activate());
            SUG.IMD[mod].active = true;
        }
    }
    await Promise.all(promises);
}


//
//  ERRORS
//

// ERRORS -> VERTICAL SCREEN
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
    return document.getElementById(id);
}

// ELEMENTS -> REPLACE CONTENT
export async function inject(element: HTMLElement, content: ReactNode): Promise<void> {
    return new Promise<void>((resolve) => {
        const Wrapper: React.FC = () => {
            React.useEffect(() => {resolve()}, []);
            return <>{content}</>;
        };
        ReactDOM.createRoot(element).render(<Wrapper/>);
    });
}


//
//  DEBUG
//

// DEBUG -> FUNCTION
export function debug(...variables: any[]) {
    for (const variable of variables) {
        console.warn(`DEBUG: ${variable}`)
    }
}