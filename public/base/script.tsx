//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import react from "€react";
/* @ts-ignore */import * as reactdom from '€react-dom/client';

// HEAD -> VIEWS
import * as _ from "&";
import * as _dashboard from "&dashboard";
import * as _error from "&error";
import * as _playground from "&playground";

// HEAD -> INTERFACE MODULES
import * as __navbar from "=navbar";
import * as __tooltip from "=tooltip";
import * as __topbar from "=topbar";


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
    get DES(): string {return document.querySelector<HTMLMetaElement>('meta[name="description"]').content},
    ORG: await connect("Main")
}


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> REDIRECT
export async function redirect(target: string, update: boolean): Promise<void> {
    if (target === window.location.pathname && update) {return}
    switch (SUG.ORG.classList[0]) {
        case "_": await _.hide(); break;
        case "_dashboard": await _dashboard.hide(); break;
        case "_playground": await _playground.hide(); break;
        default: await _error.hide();
    }
    SUG.ORG.classList.remove(...SUG.ORG.classList);
    if (update) {history.pushState(null, '', target)}
    switch (SUG.VWD[0]) {
        case '': {
            SUG.ORG.classList.add("_");
            await _.show(); 
            break;
        }
        case 'dashboard': {
            SUG.ORG.classList.add("_dashboard");
            await _dashboard.show(); 
            break;
        }
        case 'playground': {
            SUG.ORG.classList.add("_playground");
            await _playground.show(); 
            break;
        }
        default: {
            SUG.ORG.classList.add("_error"); 
            await _error.show();
        }
    }
}

// WINDOW MANAGEMENT -> VIEW LOADER
document.addEventListener('DOMContentLoaded', () => {
    redirect(window.location.pathname, false);
    if (
        window.innerWidth / window.innerHeight < 3 / 2 && 
        SUG.VWD[0] !== 'error' && SUG.VWD[1] !== '0'
    ) {
        redirect("/error/0", true);
    } else if (
        window.innerWidth / window.innerHeight >= 3 / 2 && 
        SUG.VWD[0] === 'error' && SUG.VWD[1] === '0'
    ) {
        redirect("/dashboard", true);
    }
})

// WINDOW MANAGEMENT -> BUTTON NAVIGATION
window.addEventListener('popstate', () => {
    redirect(window.location.pathname, false);
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
        redirect("/error/0", true);
    } else if (
        window.innerWidth / window.innerHeight >= 3 / 2 && 
        SUG.VWD[0] === 'error' && SUG.VWD[1] === '0'
    ) {
        redirect("/dashboard", true);
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
export async function inject(root: HTMLElement, content: react.ReactNode): Promise<void> {
    return new Promise<void>((resolve) => {
        function Wrapper(): react.ReactElement {
            react.useEffect(() => {resolve()}, []);
            return <>{content}</>
        }
        reactdom.createRoot(root).render(<Wrapper/>);
    });
}

// ELEMENTS -> CONNECT
export async function connect(path: string): Promise<HTMLElement> {
    let frames = 0;
    return new Promise((resolve, reject) => {
        function tryConnect() {
            let current = document.body;
            for (const id of path.split("/")) {
                current = Array.from(current.children).find((child) => child.id === id) as HTMLElement;
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