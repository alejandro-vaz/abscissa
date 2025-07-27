//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import React from "react";
import * as ReactDOM from 'react-dom/client';

// HEAD -> VIEWS
import * as _ from "./&/script.js";
import * as _dashboard from "./&dashboard/script.js";
import * as _error from "./&error/script.js";
import * as _playground from "./&playground/script.js";

// HEAD -> INTERFACE MODULES
import * as __navbar from "../modules/interface/navbar/script.js";
import * as __tooltip from "../modules/interface/tooltip/script.js";
import * as __topbar from "../modules/interface/topbar/script.js";

// HEAD -> ORIGIN
export const origin = await connect("Main");


//
//  SUPERGLOBALS
//

// SUPERGLOBALS -> DICTIONARY
export const SUG = {
    get VWD(): string[] {return window.location.pathname.split("/").slice(1)},
    IMD: {
        navbar: {active: false, module: __navbar},
        tooltip: {active: false, module: __tooltip},
        topbar: {active: false, module: __topbar}
    },
    get TIT(): string {return document.title},
    get DES(): string {return document.querySelector<HTMLMetaElement>('meta[name="description"]').content}
}


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> REDIRECT
export async function redirect(target: string): void {
    debug(SUG.VWD[0]);
    switch (SUG.VWD[0]) {
        case "": {
            await _.hide()
            origin.classList.remove("_");
            break;
        }
        case "dashboard": {
            await _dashboard.hide(); 
            origin.classList.remove("_dashboard");
            break;
        }
        case "playground": {
            await _playground.hide(); 
            origin.classList.remove("_playground");
            break;
        }
        default: {
            await _error.hide();
            origin.classList.remove("_error");
        }
    }
    history.pushState(null, '', target);
    debug(SUG.VWD[0]);
    switch (SUG.VWD[0]) {
        case '': {
            origin.classList.add("_");
            await _.show(); 
            break;
        }
        case 'dashboard': {
            origin.classList.add("_dashboard");
            await _dashboard.show(); 
            break;
        }
        case 'playground': {
            origin.classList.add("_playground");
            await _playground.show(); 
            break;
        }
        default: {
            origin.classList.add("_error"); 
            await _error.show();
        }
    }
}

// WINDOW MANAGEMENT -> VIEW LOADER
document.addEventListener('DOMContentLoaded', () => {
    redirect(window.location.pathname);
})

// WINDOW MANAGEMENT -> BUTTON NAVIGATION
window.addEventListener('popstate', () => {
    history.go(1);
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

// MODULE MANAGEMENT -> MODULATOR
export async function modulator(...activate: string[]): Promise<void> {
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
window.addEventListener("resize", () => {
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
export async function curl(script: string, data: object): Promise<object | boolean | string | number | null> {
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
            body: JSON.stringify(data)
        }
    )).json();
}


//
//  ELEMENTS
//

// ELEMENTS -> REPLACE CONTENT
export async function inject(root: HTMLElement, content: React.ReactNode): Promise<void> {
    return new Promise<void>((resolve) => {
        function Wrapper(): React.ReactElement {
            React.useEffect(() => {resolve()}, []);
            return <>{content}</>
        }
        ReactDOM.createRoot(root).render(<Wrapper/>);
    });
}

// ELEMENTS -> CONNECT
export async function connect(path: string): Promise<HTMLElement> {
    let frames = 0;
    return new Promise((resolve, reject) => {
        function tryConnect() {
            let current = document.body;
            for (const id of path.split("/")) {
                current = Array.from(current.children).find((child) => child.id === id);
                if (current === undefined) {break}
            }
            if (current !== undefined) {resolve(current)} else {
                frames++
                if (frames >= 100) {
                    reject(new Error(`Could not find element by path "${path}"`))
                } else {
                    requestAnimationFrame(tryConnect)
                }
            }
        }
        tryConnect();
    })
}


//
//  DEBUG
//

// DEBUG -> FUNCTION
export function debug(...variables: any[]) {
    for (const variable of variables) {
        console.warn(variable)
    }
}


//
//  TIME
//

// TIME -> DELAY
export async function delay(seconds: number): Promise<void> {
    return new Promise((resolve) => {setTimeout(resolve, seconds * 1000)})
}