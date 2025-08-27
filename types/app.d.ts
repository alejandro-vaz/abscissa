//
//  APP
//

// APP -> DICEBEAR
declare module "#dicebear" {
    export function icon(username: string): string;
}

// APP -> MATHSYS
declare module "#mathsys" {
    export function $Playground(
        {id, code}: {
            id: string,
            code: string
        }
    ): import("ß").ReactNode;
    export function compile(code: string): Promise<string>;
    export function render(code: string, element: HTMLElement, display: boolean): void;
}

// APP -> POPUP
declare module "#popup" {
    export function create(preset: string, ...presetArguments: any[]): Promise<void>;
    export function remove(): Promise<void>;
}