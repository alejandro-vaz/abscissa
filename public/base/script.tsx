//
//  HEAD
//

// HEAD -> ẞ
import * as ß from "ß";

// HEAD -> VIEWS
import $_ from "&";
import $_error from "&error";
import $_playground from "&playground";


//
//  VIEW
//

// VIEW -> APP
function $App(): ß.react.ReactNode {
    return (
        <ß.router.BrowserRouter>
            <$Content/>
        </ß.router.BrowserRouter>
    );
}

// VIEW -> CONTENT
function $Content(): ß.react.ReactNode {
    const navigate = ß.router.useNavigate();
    ß.react.useEffect(() => {
        setGlobalNavigate(navigate);
    }, [navigate]);
    return (
        <ß.react.StrictMode>
            <ß.router.Routes>
                <ß.router.Route path="/" element={<$_/>}/>
                <ß.router.Route path="/playground" element={<$_playground/>}/>
                <ß.router.Route path="*" element={<$_error/>}/>
            </ß.router.Routes>
        </ß.react.StrictMode>
    );
}

// VIEW -> RENDER
ß.Body.node.className = "h-screen w-screen";
ß.Body.root.render(<$App/>);


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> LOCATE
export function locate(): string[] {
    return window.location.pathname.split("/").slice(1);
}

// WINDOW MANAGEMENT -> NAVIGATE
let globalNavigate: ((to: string, options?: any) => void) | null = null;
function setGlobalNavigate(navigate: (to: string, options?: any) => void): void {globalNavigate = navigate}

// WINDOW MANAGEMENT -> REDIRECT
export function redirect(target: string, divide: boolean): void {
    if (target.startsWith('https://')) {
        divide ? window.open(target, "_blank", "noopener,noreferrer").opener = null : window.location.href = target;
    } else {
        if (target === window.location.pathname && !divide) {return}
        divide ? window.open(`https://${window.location.host}${target}`, "_blank", "noopener,noreferrer").opener = null : globalNavigate(target, {replace: false});
    }
}

// WINDOW MANAGEMENT -> NO CONTEXTMENU
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// WINDOW MANAGEMENT -> TITLE
export function getTitle(): string {
    return document.title;
}
export function setTitle(newTitle: string): void {
    document.title = newTitle;
}

// WINDOW MANAGEMENT -> DESCRIPTION
export function getDescription(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="description"]')
        .content;
}
export function setDescription(newDescription: string): void {
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", newDescription);
}


//
//  API
//

// API -> VIA
export class via {
    private socket: WebSocket;
    private queue: any[];
    constructor(endpoint: string, handler: (data: any) => void | Promise<void>) {
        this.socket = new WebSocket(`wss://${window.location.host}/api/${endpoint.replace(/^\/+/, "")}`);
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (
                Object.keys(data).length === 2 && 
                Object.keys(data).includes("status_code") && 
                Object.keys(data).includes("detail")
            ) {throw new Error(`API error ${data.status_code}: ${data.detail}`)}
            handler(data);
        };
        this.queue = [];
        this.socket.onopen = () => {
            for (const message of this.queue) {this.socket.send(JSON.stringify(message))}
            this.queue = [];
        }
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
        console.log(variable);
    }
}


//
//  PWA
//

// PWA -> REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {navigator.serviceWorker.register('/public/robots/serviceWorker.js')}