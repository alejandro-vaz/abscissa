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
import * as fiber from "@react-three/fiber";
import * as three from "three";

// HEAD -> ANALYTICS
gagtag.install(SUG.TAG);


//
//  EXPORTS
//

// EXPORTS -> MODULES
export {react, motion, dom, router, fiber, three};

// EXPORTS -> DEFAULT ROOT
export const Main = createRoot("Main");


//
//  DOM
//

// DOM -> REFERENCE
export type Reference = {
    node: HTMLElement,
    root: dom.Root
};

// DOM -> CREATE ROOT
export function createRoot(id: string): Reference {
    const node = document.createElement("div");
    node.id = id;
    document.body.appendChild(node);
    return {
        node: node,
        root: dom.createRoot(node)
    } as Reference;
}


//
//  COMPONENTS
//

// COMPONENTS -> BACKGROUNDS
import {default as Background$Silk} from "./ßBackground/$Silk.js";
export const Background = {
    $Silk: Background$Silk
}

// COMPONENTS -> BUTTON
import {default as Button$CallToAction} from "./ßButton/$CallToAction.js";
export const Button = {
    $CallToAction: Button$CallToAction
}

// COMPONENTS -> SUSPENSE
import {default as Suspense$Spinner} from "./ßSuspense/$Spinner.js";
export const Suspense = {
    $Spinner: Suspense$Spinner
}