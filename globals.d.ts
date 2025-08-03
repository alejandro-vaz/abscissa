//
//  GENERAL
//

// GENERAL -> MODULE
declare module "$" {
    export const SUG: {
        VMD: string[], 
        IMD: object, 
        TIT: string, 
        DES: string, 
        ORG: HTMLElement
    };
    export async function redirect(target: string, update: boolean): Promise<void>;
    export function setTitle(newTitle: string): void;
    export function setDescription(newDescription: string): void;
    export async function modulator(...activate: string[]): Promise<void>;
    export async function curl(script: string, data: object): Promise<object | boolean | string | number | null>;
    export async function inject(root: HTMLElement, content: react.ReactNode): Promise<void>;
    export async function connect(path: string): Promise<HTMLElement>;
    export function debug(...variables: any[]): void;
    export async function delay(seconds: number): Promise<void>;
}


//
//  VIEW
//

// VIEW -> &
declare module "&" {
    export async function show(): Promise<void>;
    export async function hide(): Promise<void>;
}

// VIEW -> &DASHBOARD
declare module "&dashboard" {
    export async function show(): Promise<void>;
    export async function hide(): Promise<void>;
}

// VIEW -> &ERROR
declare module "&error" {
    export async function show(): Promise<void>;
    export async function hide(): Promise<void>;
}

// VIEW -> &PLAYGROUND
declare module "&playground" {
    export async function show(): Promise<void>;
    export async function hide(): Promise<void>;
}


//
//  APP
//

// APP -> DICEBEAR
declare module "#dicebear" {
    export function icon(username: string): string;
}

// APP -> POPUP
declare module "#popup" {
    export async function create(preset: string, ...presetArguments: any[]): Promise<void>;
    export async function remove(): Promise<void>;
}

// APP -> RENDER
declare module "#render" {
    export function playground(text: string, parent: HTMLElement, output: HTMLElement): codemirrorView.EditorView;
    export async function string(code: string, element: HTMLElement): Promise<void>;
}


//
//  INTERFACE
//

// INTERFACE -> NAVBAR
declare module "=navbar" {
    export async function activate(): Promise<void>;
    export async function deactivate(): Promise<void>;
}

// INTERFACE -> TOOLTIP
declare module "=tooltip" {
    export async function activate(): Promise<void>;
    export async function deactivate(): Promise<void>;
}

// INTERFACE -> TOPBAR
declare module "=topbar" {
    export async function activate(): Promise<void>;
    export async function deactivate(): Promise<void>;
}


//
//  EXTERN
//

// EXTERN -> REACT
declare module "€react" {
    export function useState(arg1: any): any;
    export function useEffect(arg1: any, arg2: any): any;
    export class ReactNode {};
    export class ReactElement {};
    export const FormEvent: any;
}

// EXTERN -> REACT DOM
declare module "€react-dom/client" {
    export function createRoot(arg1: any): any;
}

// EXTERN -> KATEX
declare module "€katex/contrib/auto-render" {
    const value: any;
    export default value;
}

// EXTERN -> CODEMIRROR STATE
declare module "€@codemirror/state" {
    export const EditorState: any;
}

// EXTERN -> CODEMIRROR VIEW
declare module "€@codemirror/view" {
    export class EditorView {
        constructor(arg1: any): any;
        [key: string]: any;
        static updateListener: any;
        static theme: any;
        static lineWrapping: any;
    };
    export class keymap {
        static of: any;
    }
    export function lineNumbers(): any;
    export function highlightActiveLine(): any;
}

// EXTERN -> CODEMIRROR COMMANDS
declare module "€@codemirror/commands" {
    export const historyKeymap: any;
    export function history(): any;
}

// EXTERN -> DICEBEAR CORE
declare module "€@dicebear/core" {
    export function createAvatar(arg1: any, arg2: any): any;
}

// EXTERN -> DICEBEAR IDENTICON
declare module "€@dicebear/identicon" {
    const value: any;
    export default value;
}

// EXTERN -> MOTION
declare module "€motion/react" {}