//
//  HEAD
//

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
    ORG: await connect("Main"),
    PAT: {
        Uemail: /^[A-Za-z0-9._%\-]{8,64}@gmail\.com$/,
        Uhashpass: /^.{8,64}$/,
        Uname: /^[a-zA-Z0-9_-]{4,32}$/
    }
}


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> REDIRECT
export async function redirect(target: string, append: boolean = true, divide: boolean = false): Promise<void> {
    if (target === window.location.pathname && append && !divide) {return}
    if (divide) {
        window.open("https://" + window.location.host + target, "_blank");
    } else {
        switch (SUG.ORG.classList[0]) {
            case "_": await _.hide(); break;
            case "_dashboard": await _dashboard.hide(); break;
            case "_playground": await _playground.hide(); break;
            default: await _error.hide();
        }
        SUG.ORG.classList.remove(...SUG.ORG.classList);
        if (append) {history.pushState(null, '', target)}
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
}

// WINDOW MANAGEMENT -> CHECK ASPECT RATIO
async function aspectRatio() {
    if (
        window.innerWidth / window.innerHeight < 3 / 2 &&
        SUG.VWD[0] !== 'error' &&
        SUG.VWD[1] !== '0'
    ) {
        await redirect('/error/0');
    } else if (
        window.innerWidth / window.innerHeight >= 3 / 2 &&
        SUG.VWD[0] === 'error' &&
        SUG.VWD[1] === '0'
    ) {
        await redirect('/dashboard');
    }
}

// WINDOW MANAGEMENT -> ASPECT RATIO
document.addEventListener('DOMContentLoaded', async() => {await redirect(window.location.pathname, false); await aspectRatio()})
window.addEventListener("resize", aspectRatio);

// WINDOW MANAGEMENT -> BUTTON NAVIGATION
window.addEventListener('popstate', async() => {
    await redirect(window.location.pathname, false);
})

// WINDOW MANAGEMENT -> NO CONTEXTMENU
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
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
//  API                                                                       
//

// API -> JSON RESPONSE
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

// API -> STREAMING RESPONSE
export async function stream(script: string, data: object): Promise<ArrayBuffer> {
    const response = await fetch(
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
    );
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalLength = 0;
    while (true) {
        const {done, value} = await reader.read();
        if (done) {break}
        if (value) {
            chunks.push(value);
            totalLength += value.length;
        }
    }
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength);
}


//
//  ELEMENTS
//

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
//  TIME
//

// TIME -> DELAY
export async function delay(seconds: number): Promise<void> {
    return new Promise((resolve) => {setTimeout(resolve, seconds * 1000)})
}


//
//  REGEX
//

// REGEX -> VALIDATE
export function check(input: string, pattern: RegExp): boolean {
    return pattern.test(input);
}


//
//  DEBUG
//

// DEBUG -> FUNCTION
export function debug(...variables: any[]): void {
    for (const variable of variables) {
        console.log(variable)
    }
}