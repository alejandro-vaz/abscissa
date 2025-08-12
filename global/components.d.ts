//
//  COMPONENTS
//

// COMPONENTS -> SCRIPT
declare module "ß" {
    // SCRIPT -> EXPORTS
    export type ReactElement = import("€react").ReactElement;
    export type ReactNode = import("€react").ReactNode;
    export function Suspense(arg1: {fallback?: ReactNode; children?: ReactNode}): ReactElement;
    export function useState<Type>(value: Type | null): [Type | null, (change: Type | null) => void];
    export const span: any;
    export const button: any;
    export const input: any;
    export const Main: Reference;
    // SCRIPT -> DOM
    export function connect(path: string): Promise<HTMLElement>;
    export type Reference = {node: HTMLElement; root: any; children: any[]};
    // SCRIPT -> ROOT
    export function createRoot(id: string): Promise<Reference>;
    // SCRIPT -> MANIPULATION
    export function inject(reference: Reference, content: ReactNode): Promise<number>;
    export function clean(reference: Reference): Promise<void>;
    // SCRIPT -> UTILITIES
    export function onRender(call: () => any): void;
    export function mount(call: (node) => any): (node) => Promise<void>;
    // SCRIPT -> ANALYTICS
    export function view(pathname: string): void;
}

// COMPONENTS -> BUTTON
declare module "ßButton" {
    // BUTTON -> ELEMENT
    export default function $Button(
        {text, onClick, onContextMenu, id, ["data-tooltip"]: dataTooltip, disabled}: {
            text: string,
            onClick?: () => any,
            onContextMenu?: () => any,
            id: string,
            "data-tooltip": string,
            disabled?: boolean
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> FORM
declare module "ßForm" {
    // FORM -> ELEMENT
    export default function $Form(
        {id, onSubmit, children}: {
            id: string,
            onSubmit: (event) => any,
            children?: import("ß").ReactNode
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> INPUTEMAIL
declare module "ßInputEmail" {
    // INPUTEMAIL -> ELEMENT
    export default function $InputEmail(
        {id, name, placeholder}: {
            id: string,
            name: string,
            placeholder?: boolean
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> INPUTPASSWORD
declare module "ßInputPassword" {
    // INPUTPASSWORD -> ELEMENT
    export default function $InputPassword(
        {id, name, placeholder}: {
            id: string,
            name: string,
            placeholder?: boolean
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> INPUTSUBMIT
declare module "ßInputSubmit" {
    // INPUTSUBMIT -> ELEMENT
    export default function $InputSubmit(
        {id, text, ["data-tooltip"]: dataTooltip, disabled}: {
            id: string,
            text: string,
            "data-tooltip": string,
            disabled?: boolean
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> INPUTTEXT
declare module "ßInputText" {
    // INPUTTEXT -> ELEMENT
    export default function $InputText(
        {id, name, placeholder}: {
            id: string,
            name: string,
            placeholder?: boolean
        }
    ): import("ß").ReactElement;
}

// COMPONENTS -> SUSPENSE
declare module "ßSuspense" {
    // SUSPENSE -> ELEMENT
    export default function $Suspense(
        {}: {}
    ): import("ß").ReactElement;
}

// COMPONENTS -> SVGICON
declare module "ßSVGIcon" {
    // SVGICON -> ELEMENT
    export default function $SVGIcon(
        {path, onClick, onContextMenu, id, ["data-tooltip"]: dataTooltip}: {
            path: string,
            onClick?: () => any,
            onContextMenu?: () => any,
            id: string,
            "data-tooltip": string
        }
    ): import("ß").ReactElement;
}