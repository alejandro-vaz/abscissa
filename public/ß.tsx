//
//  HEAD
//

// HEAD -> MODULES
import * as react from "react";
import * as gagtag from "ga-gtag";
import * as motion from "motion/react";
import * as dom from "react-dom/client";
import * as router from "react-router-dom";
import * as fiber from "@react-three/fiber";
import * as three from "three";

// HEAD -> ANALYTICS
gagtag.install("G-46CZCGTLM5");

// HEAD -> VIEWS
import $_ from "&";
import $_error from "&error";
import $_playground from "&playground";


//
//  EXPORTS
//
export {react, motion, dom, router, fiber, three};
export const Body = {
    node: document.body,
    root: dom.createRoot(document.body)
};


//
//  ROUTER
//

// ROUTER -> APP
function $App(): react.ReactNode {
    return (
        <router.BrowserRouter>
            <$Content/>
        </router.BrowserRouter>
    );
}

// ROUTER -> CONTENT
function $Content(): react.ReactNode {
    const navigate = router.useNavigate();
    react.useEffect(() => {
        setGlobalNavigate(navigate);
    }, [navigate]);
    return (
        <react.StrictMode>
            <router.Routes>
                <router.Route path="/" element={<$_/>}/>
                <router.Route path="/playground" element={<$_playground/>}/>
                <router.Route path="*" element={<$_error/>}/>
            </router.Routes>
        </react.StrictMode>
    );
}

// ROUTER -> MAIN
export function $Main({background, children, navbar}: {
    background?: keyof typeof Background,
    children?: react.ReactNode,
    navbar?: keyof typeof Navbar
}): react.ReactNode {
    const BackgroundComponent = background ? Background[background] : null;
    const NavbarComponent = navbar ? Navbar[navbar] : null;
    return (
        <>
            {BackgroundComponent && <BackgroundComponent/>}
            {NavbarComponent ? <NavbarComponent>{children}</NavbarComponent> : children}
        </>
    );
}

// ROUTER -> RENDER
if (typeof window !== 'undefined' && Body && Body.root) {Body.root.render(<$App/>)}


//
//  PRIVATE COMPONENTS
//

// PRIVATE COMPONENTS -> BACKGROUND
import {default as Background$Silk} from "./components/ßBackground/$Silk.js";
import {default as Background$Fluid} from "./components/ßBackground/$Fluid.js";
import {default as Background$Solid} from "./components/ßBackground/$Solid.js";
const Background = {
    $Silk: Background$Silk,
    $Fluid: Background$Fluid,
    $Solid: Background$Solid
};

// PRIVATE COMPONENTS -> NAVBAR
import {default as Navbar$Usual} from "./components/ßNavbar/$Usual.js";
const Navbar = {
    $Usual: Navbar$Usual
};


//
//  PUBLIC COMPONENTS
//

// PUBLIC COMPONENTS -> BUTTON
import {default as Button$CallToAction} from "./components/ßButton/$CallToAction.js";
import {default as Button$Small} from "./components/ßButton/$Small.js";
export const Button = {
    $CallToAction: Button$CallToAction,
    $Small: Button$Small
};

// PUBLIC COMPONENTS -> SUSPENSE
import {default as Suspense$Hide} from "./components/ßSuspense/$Hide.js";
import {default as Suspense$Spinner} from "./components/ßSuspense/$Spinner.js";
export const Suspense = {
    $Hide: Suspense$Hide,
    $Spinner: Suspense$Spinner
};


//
//  WINDOW
//

// WINDOW -> LOCATE
export function locate(): string[] {
    return window.location.pathname.split("/").slice(1);
}

// WINDOW -> NAVIGATOR
let globalNavigate: ((to: string, options?: any) => void) | null = null;
function setGlobalNavigate(navigate: (to: string, options?: any) => void): void {globalNavigate = navigate}

// WINDOW -> REDIRECT
export function redirect(target: string, divide: boolean): void {
    if (target.startsWith('https://')) {
        divide ? window.open(target, "_blank", "noopener,noreferrer") : window.location.href = target;
    } else {
        if (target === window.location.pathname && !divide) {return;}
        divide ? window.open(`https://${window.location.host}${target}`, "_blank", "noopener,noreferrer") : globalNavigate && globalNavigate(target, {replace: false});
    }
}

// WINDOW -> CONTEXT MENU REMOVER
document.addEventListener("contextmenu", (event) => {event.preventDefault()});

// WINDOW -> GET TITLE
export function getTitle(): string {
    return document.title;
}

// WINDOW -> SET TITLE
export function setTitle(newTitle: string): void {
    document.title = newTitle;
}

// WINDOW -> GET DESCRIPTION
export function getDescription(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? '';
}

// WINDOW -> SET DESCRIPTION
export function setDescription(newDescription: string): void {
    document.querySelector('meta[name="description"]')?.setAttribute("content", newDescription);
}


//
//  API
//

// API -> VIA
export class via {
    private socket: WebSocket;
    private queue: any[];
    constructor(endpoint: string, handler: (data: any) => void | Promise<void>) {
        this.socket = new WebSocket(`wss://${window.location.host}/api/${endpoint.replace(/^\/+/g, "")}`);
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (
                Object.keys(data).length === 2 && 
                Object.keys(data).includes("status_code") && 
                Object.keys(data).includes("detail")
            ) {throw new Error(`API error ${data.status_code}: ${data.detail}`);}
            handler(data);
        };
        this.queue = [];
        this.socket.onopen = () => {
            for (const message of this.queue) {this.socket.send(JSON.stringify(message));}
            this.queue = [];
        };
    }
    send<Request>(data: Request): void {
        if (this.socket.readyState === this.socket.OPEN) {
            this.socket.send(JSON.stringify(data as Request));
        } else {
            this.queue.push(data);
        }
    }
    close(): void {
        this.socket.close();
    }
}


//
//  TIME
//

// TIME -> DELAY
export async function delay(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}


//
//  REGEX
//

// REGEX -> CHECK
export function check(input: string, pattern: RegExp): boolean {
    return pattern.test(input);
}


//
//  DEBUG
//

// DEBUG -> TO CONSOLE
export function debug(...variables: any[]): void {
    for (const variable of variables) {
        console.log(variable);
    }
}


//
//  PWA
//

// PWA -> SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/robots/serviceWorker.js');
}
