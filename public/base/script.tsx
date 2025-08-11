//
//  HEAD
//

// HEAD -> ẞ
import * as ß from "ß";

// HEAD -> VIEWS
import $_ from "&";
import $_dashboard from "&dashboard";
import $_error from "&error";
import $_playground from "&playground";

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
        window.open(`https://${window.location.host}${target}`, "blank");
    } else {
        ß.Main.node.classList.remove(...ß.Main.node.classList);
        await ß.clean(ß.Main);
        if (append) {history.pushState(null, '', target)}
        switch (SUG.VWD[0]) {
            case '': {
                ß.Main.node.classList.add("_");
                await ß.inject(ß.Main, <$_/>);
                break;
            }
            case 'dashboard': {
                ß.Main.node.classList.add("_dashboard");
                await ß.inject(ß.Main, <$_dashboard/>);
                break;
            }
            case 'playground': {
                ß.Main.node.classList.add("_playground");
                await ß.inject(ß.Main, <$_playground/>);
                break;
            }
            default: {
                ß.Main.node.classList.add("_error"); 
                await ß.inject(ß.Main, <$_error/>);
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
await redirect(window.location.pathname, false); 
await aspectRatio()
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
export function modulator(...activate: string[]): void {
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
    Promise.all(promises);
}


//
//  API                                                                       
//

// API -> JSON RESPONSE
export async function curl(script: string, data: object): Promise<object | boolean | string | number | null> {
    return (await fetch(
        `https://${window.location.host}/api/${script.replace(/^\/+/, '')}`,
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