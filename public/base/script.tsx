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


//
//  WINDOW MANAGEMENT
//

// WINDOW MANAGEMENT -> LOCATE
export function locate(): string[] {
    return window.location.pathname.split("/").slice(1);
}

// WINDOW MANAGEMENT -> APP
function $App(): ß.ReactNode {
    return (
        <ß.BrowserRouter>
            <$Content/>
        </ß.BrowserRouter>
    );
}
function $Content(): ß.ReactNode {
    const navigate = ß.useNavigate();
    ß.useEffect(() => {
        setGlobalNavigate(navigate);
    }, [navigate]);
    return (
        <ß.Routes>
            <ß.Route path="/" element={<$_/>}/>
            <ß.Route path="/dashboard" element={<$_dashboard/>}/>
            <ß.Route path="/playground" element={<$_playground/>}/>
            <ß.Route path="*" element={<$_error/>}/>
        </ß.Routes>
    );
}
ß.Main.root.render(<$App/>);
ß.Main.node.className = "h-screen w-screen";

// WINDOW MANAGEMENT -> NAVIGATE
let globalNavigate: ((to: string, options?: any) => void) | null = null;
function setGlobalNavigate(navigate: (to: string, options?: any) => void): void {
    globalNavigate = navigate;
}

// WINDOW MANAGEMENT -> REDIRECT
export function redirect(target: string, append: boolean = true, divide: boolean = false): void {
    if (target === window.location.pathname && append && !divide) {return}
    if (divide) {
        window.open(`https://${window.location.host}${target}`, "blank");
    } else {
        globalNavigate(target, {replace: !append});
    }
}

// WINDOW MANAGEMENT -> CHECK ASPECT RATIO
function aspectRatio(): void {
    const location = locate();
    if (
        window.innerWidth / window.innerHeight < 3 / 2 &&
        location[0] !== 'error' &&
        location[1] !== '0'
    ) {
        redirect('/error/0');
    } else if (
        window.innerWidth / window.innerHeight >= 3 / 2 &&
        location[0] === 'error' &&
        location[1] === '0'
    ) {
        redirect('/dashboard');
    }
}

// WINDOW MANAGEMENT -> ENFORCE ASPECT RATIO
aspectRatio()
window.addEventListener("resize", aspectRatio);

// WINDOW MANAGEMENT -> BUTTON NAVIGATION
window.addEventListener('popstate', async() => {
    redirect(window.location.pathname, false);
})

// WINDOW MANAGEMENT -> NO CONTEXTMENU
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

// WINDOW MANAGEMENT -> GET TITLE
export function getTitle(): string {
    return document.title;
}

// WINDOW MANAGEMENT -> SET TITLE
export function setTitle(newTitle: string): void {
    document.title = newTitle;
}

// WINDOW MANAGEMENT -> GET DESCRIPTION
export function getDescription(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="description"]').content;
}

// WINDOW MANAGEMENT -> SET DESCRIPTION
export function setDescription(newDescription: string): void {
    document.querySelector('meta[name="description"]').setAttribute('content', newDescription);
}


//
//  INTERFACE MANAGEMENT
//

// INTERFACE MANAGEMENT -> REGISTRY
const registry = {}

// INTERFACE MANAGEMENT -> MODULATOR
export function modulator(...activate: string[]): void {
    const promises = [];
    for (const mod in registry) {
        if (registry[mod].active && !activate.includes(mod)) {
            promises.push(registry[mod].module.deactivate());
            registry[mod].active = false;
        } else if (!registry[mod].active && activate.includes(mod)) {
            promises.push(registry[mod].module.activate());
            registry[mod].active = true;
        }
    }
    Promise.all(promises);
}


//
//  API                                                                       
//

// API -> CALL
export async function curl<Request, Response>(script: string, data?: Request): Promise<Response> {
    const response = (await fetch(
        `https://${window.location.host}/api/${script.replace(/^\/+/, '')}`,
        {
            cache: "no-store",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data as Request)
        }
    ));
    switch (script) {
        default: {
            return response.json() as Response;
        }
    }
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