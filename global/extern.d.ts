//
//  EXTERN
//

// EXTERN -> REACT
declare module "react" {
    // REACT -> TYPES
    export type ReactNode = {}
    export type ReactElement = {}
    export type FormEvent<Type = Element> = {
        currentTarget: Type;
        preventDefault: () => void;
    }
    // REACT -> UTILITIES
    export function useState<Type>(value: Type | null): [Type | null, (change: Type | null) => void];
    export function useEffect(arg1: any, arg2: any): any;
    export function Suspense(arg1: {fallback?: ReactNode; children?: ReactNode}): ReactElement;
}
declare module "€react" {export * from "react"}

// EXTERN -> REACT JSX
declare module "react/jsx-runtime" {}
declare module "€react/jsx-runtime" {}

// EXTERN -> REACT DOM
declare module "react-dom/client" {
    // REACT DOM -> CREATE ROOT
    export function createRoot(arg1: any): any;
}
declare module "€react-dom/client" {export * from "react-dom/client"}

// EXTERN -> KATEX
declare module "katex/contrib/auto-render" {
    // KATEX -> FUNCTION
    export default function katex(arg1: any, arg2: any): void;
}
declare module "€katex/contrib/auto-render" {export {default} from "katex/contrib/auto-render"}

// EXTERN -> CODEMIRROR STATE
declare module "@codemirror/state" {
    // CODEMIRROR STATE -> CONSTANT
    export const EditorState: any;
}
declare module "€@codemirror/state" {export * from "@codemirror/state"}

// EXTERN -> CODEMIRROR VIEW
declare module "@codemirror/view" {
    // COREMIRROR VIEW -> CLASSES
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
    // CODEMIRROR VIEW -> EXTENSIONS
    export function lineNumbers(): any;
    export function highlightActiveLine(): any;
}
declare module "€@codemirror/view" {export * from "@codemirror/view"}

// EXTERN -> CODEMIRROR COMMANDS
declare module "@codemirror/commands" {
    // CODEMIRROR COMMANDS -> HISTORY EXTENSION
    export const historyKeymap: any;
    export function history(): any;
}
declare module "€@codemirror/commands" {export * from "@codemirror/commands"}

// EXTERN -> DICEBEAR CORE
declare module "@dicebear/core" {
    // DICEBEAR CORE -> CREATE AVATAR
    export function createAvatar(arg1: any, arg2: any): any;
}
declare module "€@dicebear/core" {export * from "@dicebear/core"}

// EXTERN -> DICEBEAR IDENTICON
declare module "@dicebear/identicon" {
    // DICEBEAR IDENTICON -> CONSTANT
    const value: any;
    export default value;
}
declare module "€@dicebear/identicon" {export {default} from "@dicebear/identicon"}

// EXTERN -> MOTION
declare module "motion/react" {
    // MOTION -> ANIMATE
    export const AnimatePresence: any;
    // MOTION -> ELEMENTS
    export namespace motion {
        const span: any;
        const button: any;
        const input: any;
    }
}
declare module "€motion/react" {export * from "motion/react"}

// EXTERN -> GTAG
declare module "ga-gtag" {
    // GTAG -> INSTALL
    export function install(code: string, options?: object): void;
    // GTAG -> REGISTER
    export function gtag(type: string, action: string, options?: object): void;
}
declare module "€ga-gtag" {export * from "ga-gtag"}