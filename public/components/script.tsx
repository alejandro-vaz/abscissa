//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import react from "€react";
import * as motion from "€motion/react";
import * as reactdom from '€react-dom/client';

// HEAD -> COMPONENTS
import $Suspense from "ßSuspense";

//
//  EXPORTS
//

// EXPORTS -> REACT TYPES
export type ReactElement = react.ReactElement;
export type ReactNode = react.ReactNode;

// EXPORTS -> REACT ELEMENTS
export const Suspense = react.Suspense;
export const use = react.use;

// EXPORTS -> MOTION ELEMENTS
export const span = motion.motion.span;
export const button = motion.motion.button;

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
        if (reference.children.length === 0 && reference.node.id === "Main"){
            reference.root.render(<$Suspense/>);
        } else {
            reference.root.render(
                <Suspense fallback={<$Suspense/>}>
                    {reference.children}
                </Suspense>
            );
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

// UTILITIES -> USEEFFECT
export function useEffect(call: () => void): void {
    react.useEffect(call, []);
}

// UTILITIES -> USESTATE
export function useState<Type>(value: any): [any, (change) => void] {
    return react.useState<Type>(value);
}

// UTILITIES -> ON MOUNT
export function mount(call: (node) => any): (node) => Promise<void> {
    return async(node) => {
        if ((node) == null) {return};
        await call(node);
    }
}