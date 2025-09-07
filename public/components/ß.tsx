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
export const Body = {
    node: document.body,
    root: dom.createRoot(document.body)
}


//
//  MAIN
//

// MAIN -> WRAPPER
export function $Main({background, children, navbar}: {
    background?: keyof typeof Background,
    children: react.ReactNode,
    navbar?: keyof typeof Navbar
}): react.ReactNode {
    return (
        <>  
            {background && Background[background]()}
            {navbar ? Navbar[navbar]({children}) : children}
        </>
    );
}


//
//  PRIVATE COMPONENTS
//

// PRIVATE COMPONENTS -> BACKGROUND
import {default as Background$Silk} from "./ßBackground/$Silk.js";
import {default as Background$Fluid} from "./ßBackground/$Fluid.js";
const Background = {
    $Silk: Background$Silk,
    $Fluid: Background$Fluid
}

// PRIVATE COMPONENTS -> NAVBAR
import {default as Navbar$Usual} from "./ßNavbar/$Usual.js";
const Navbar = {
    $Usual: Navbar$Usual
}


//
//  COMPONENTS
//

// COMPONENTS -> BUTTON
import {default as Button$CallToAction} from "./ßButton/$CallToAction.js";
import {default as Button$Small} from "./ßButton/$Small.js";
export const Button = {
    $CallToAction: Button$CallToAction,
    $Small: Button$Small
}

// COMPONENTS -> SUSPENSE
import {default as Suspense$Hide} from "./ßSuspense/$Hide.js";
import {default as Suspense$Spinner} from "./ßSuspense/$Spinner.js";
export const Suspense = {
    $Hide: Suspense$Hide,
    $Spinner: Suspense$Spinner
}