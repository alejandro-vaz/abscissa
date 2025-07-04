//
//  HEAD
//

// HEAD -> MODULES 
import React from 'react';
// @ts-ignore
import * as ReactDOM from 'https://esm.sh/react-dom@19.1.0/client';


//                                                                            
//  WINDOW                                                            
//                                                                            

// WINDOW -> SUPERGLOBALS
export const SUG = {
    PAR: Object.fromEntries(new URLSearchParams(window.location.search).entries())
}

// WINDOW -> REDIRECT
export function redirect(target: string): void {
    window.location.href = target;
}

// WINDOW -> RUNNING ON MAIN
export function ismain(script: string): boolean {
    return document.currentScript?.getAttribute('src')?.endsWith(`${script}/script.js`)
}

// WINDOW -> FORCE ASPECT RATIO
if (document.currentScript?.getAttribute('src')?.endsWith('general.js')) {
    window.addEventListener("resize", function(): void {
        if (
            window.innerWidth / window.innerHeight < 3 / 2 && 
            window.location.pathname.split("/").pop() !== "error"
        ) {
            redirect("error?code=0");
        } else if (
            window.innerWidth / window.innerHeight >= 3 / 2 && 
            window.location.pathname.split("/").pop() == "error" && 
            +SUG.PAR.code == 0
        ) {
            redirect("dashboard");
        }
    });
}


//                                                                            
//  API                                                                       
//                                                                            

// API -> REQUEST
export async function curl(script: string, data: object, timeout = 5000): Promise<object | boolean> {
    return (await fetch(
        (window.location.protocol === "https:" ? 'https' : 'http') + 
        ("://") +
        (window.location.host) +
        ("/api/") +
        (script.replace(/^\/+/, '')),
        {
            cache: "no-store",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(timeout)
        }
    )).json();
}


//
//  REACT
//

// REACT -> APPEND CONTENT
export function inject(element: HTMLElement, content: React.ReactNode): void {
    ReactDOM.createRoot(element).render(content);
}


//
//  ELEMENTS
//

// ELEMENTS -> CONNECTIONS
export function connect(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element) {
        return element
    } else {
        throw new Error(`Could not connect to ${id}`)
    }
}