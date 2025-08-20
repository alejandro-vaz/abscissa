//
//  HEAD
//

// HEAD -> MODULES
import react from "€react";
import * as SUG from "SUG";
import * as gagtag from "€ga-gtag";
import * as motion from "€motion/react";
import * as reactdom from '€react-dom/client';

// HEAD -> COMPONENTS
import $Suspense from "ßSuspense";

// HEAD -> ANALYTICS
gagtag.install(SUG.TAG);


//
//  EXPORTS
//

// EXPORTS -> REACT TYPES
export type ReactElement = react.ReactElement;
export type ReactNode = react.ReactNode;

// EXPORTS -> REACT FUNCTIONS
export const Suspense = react.Suspense;
export const useState = react.useState;

// EXPORTS -> MOTION ELEMENTS
export const span = motion.motion.span;
export const button = motion.motion.button;
export const input = motion.motion.input;
export const div = motion.motion.div;
export const AnimatePresence = motion.AnimatePresence;

// EXPORTS -> DEFAULT ROOT
export const Main = await createRoot("Main");


//
//  DOM
//

// DOM -> CONNECT
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

// DOM -> REFERENCE
export type Reference = {
    node: HTMLElement,
    root: any,
    children: any[]
};


//
//  ROOT
//

// ROOT -> CREATE
export async function createRoot(id: string): Promise<Reference> {
    const node = document.createElement("div");
    node.id = id
    document.body.appendChild(node);
    const reference = {
        node: node,
        root: reactdom.createRoot(node),
        children:[]
    } as Reference;
    await render(reference);
    return reference;
}


//
//  MANIPULATION
//

// MANIPULATION -> RENDER
async function render(reference: Reference): Promise<void> {
    return new Promise<void>((resolve) => {
        if (reference.children.length === 0 && reference.node.id === "Main") {
            reference.root.render(<$Suspense/>);
        } else {
            reference.root.render(reference.children[0]);
        }
        resolve();
    });
}

// MANIPULATION -> INJECT
export async function inject(reference: Reference, content: ReactNode): Promise<number> {
    reference.children = [content];
    await render(reference);
    return 0;
}

// MANIPULATION -> CLEAN
export async function clean(reference: Reference): Promise<void> {
    reference.children = [];
    await render(reference);
}


//
//  UTILITIES
//

// UTILITIES -> ONRENDER
export function onRender(call: () => any): void {
    react.useEffect(() => {void call()}, []);
}

// UTILITIES -> MOUNT
export function mount(call: (node) => any): (node) => void {
    return async(node) => {
        if ((node) == null) {return};
        void await call(node);
    }
}