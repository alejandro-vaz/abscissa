//
//  HEAD
//

// HEAD -> MODULES
import react from "react";
import * as SUG from "SUG";
import * as gagtag from "ga-gtag";
import * as motion from "motion/react";
import * as reactdom from 'react-dom/client';
import * as router from "react-router-dom";

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

// EXPORTS -> ROUTER
export const Routes = router.Routes;
export const Route = router.Route;
export const useNavigate = router.useNavigate;
export const BrowserRouter = router.BrowserRouter;

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

// MANIPULATION -> RENDER
async function render(reference: Reference): Promise<void> {
    return new Promise<void>((resolve) => {
        reference.root.render(reference.children[0]);
        resolve();
    });
}


//
//  UTILITIES
//

// UTILITIES -> ONRENDER
export function onRender(call: () => any): void {
    react.useEffect(() => {void call()}, []);
}

// UTILITIES -> USEEFFECT
export const useEffect = react.useEffect;

// UTILITIES -> MOUNT
export function mount(call: (node) => any): (node) => void {
    return async(node) => {
        if ((node) == null) {return};
        void await call(node);
    }
}