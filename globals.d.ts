//
//  GENERAL
//

// GENERAL -> MODULE
declare module "$" {
    export const SUG: {
        VWD: string[], 
        IMD: {
            navbar: {active: boolean, module: any},
            tooltip: {active: boolean, module: any},
            topbar: {active: boolean, module: any}
        }, 
        TIT: string, 
        DES: string, 
        ORG: HTMLElement,
        PAT: {
            Uemail: RegExp,
            Uhashpass: RegExp,
            Uname: RegExp
        }
    };
    export function redirect(target: string, append?: boolean, divide?: boolean): Promise<void>;
    export function setTitle(newTitle: string): void;
    export function setDescription(newDescription: string): void;
    export function modulator(...activate: string[]): Promise<void>;
    export function curl(script: string, data: object): Promise<object | boolean | string | number | null>;
    export function inject(root: HTMLElement, content: import("€react").ReactNode): Promise<void>;
    export function connect(path: string): Promise<HTMLElement>;
    export function delay(seconds: number): Promise<void>;
    export function check(input: string, pattern: RegExp): boolean
    export function debug(...variables: any[]): void;
}


//
//  VIEW
//

// VIEW -> &
declare module "&" {
    export function show(): Promise<void>;
    export function hide(): Promise<void>;
}

// VIEW -> &DASHBOARD
declare module "&dashboard" {
    export function show(): Promise<void>;
    export function hide(): Promise<void>;
}

// VIEW -> &ERROR
declare module "&error" {
    export function show(): Promise<void>;
    export function hide(): Promise<void>;
}

// VIEW -> &PLAYGROUND
declare module "&playground" {
    export function show(): Promise<void>;
    export function hide(): Promise<void>;
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
    export function create(preset: string, ...presetArguments: any[]): Promise<void>;
    export function remove(): Promise<void>;
}

// APP -> RENDER
declare module "#render" {
    export function playground(text: string, parent: HTMLElement, output: HTMLElement): import("€@codemirror/view").EditorView;
    export function string(code: string, element: HTMLElement): Promise<void>;
}


//
//  INTERFACE
//

// INTERFACE -> NAVBAR
declare module "=navbar" {
    export function activate(): Promise<void>;
    export function deactivate(): Promise<void>;
}

// INTERFACE -> TOOLTIP
declare module "=tooltip" {
    export function activate(): Promise<void>;
    export function deactivate(): Promise<void>;
}

// INTERFACE -> TOPBAR
declare module "=topbar" {
    export function activate(): Promise<void>;
    export function deactivate(): Promise<void>;
}


//
//  EXTERN
//

// EXTERN -> REACT
declare module "€react" {
    export function useState(arg1: any): any;
    export function useEffect(arg1: any, arg2: any): any;
    export class ReactNode {}
    export class ReactElement {}
    export const FormEvent: any;
    export type FormEvent<Type = Element> = {
        currentTarget: Type;
        preventDefault: () => void;
    }
    export function Suspense(arg1: {fallback?: ReactNode; children?: ReactNode}): ReactElement;
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
        constructor(arg1: any);
        [key: string]: any;
        static updateListener: any;
        static theme: any;
        static lineWrapping: any;
    }
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