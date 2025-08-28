//
//  HEAD
//

// HEAD -> MODULES
import react from "react";
import * as SUG from "SUG";
import * as gagtag from "ga-gtag";
import * as motion from "motion/react";
import * as dom from "react-dom/client";
import * as router from "react-router-dom";

// HEAD -> ANALYTICS
gagtag.install(SUG.TAG);


//
//  EXPORTS
//

// EXPORTS -> MODULES
export {react, motion, dom, router};

// EXPORTS -> DEFAULT ROOT
export const Main = await createRoot("Main");


//
//  DOM
//

// DOM -> REFERENCE
export type Reference = {
    node: HTMLElement;
    root: any;
    children: any[];
};


//
//  ROOT
//

// ROOT -> CREATE
export async function createRoot(id: string): Promise<Reference> {
    const node = document.createElement("div");
    node.id = id;
    document.body.appendChild(node);
    const reference = {
        node: node,
        root: dom.createRoot(node),
        children: [],
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

// UTILITIES -> MOUNT
export function mount(call: (node) => any): (node) => void {
    return async (node) => {
        if (node == null) {
            return;
        }
        void (await call(node));
    };
}
