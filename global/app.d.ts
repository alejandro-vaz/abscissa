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
        {initial, id, output}: {
            initial: string,
            id: string,
            output: string
        }
    ): import("ß").ReactElement;
    export function view(code: string, element: HTMLElement): Promise<void>;
    export function run(code: string): Promise<string>;
}

// APP -> POPUP
declare module "#popup" {
    export function create(preset: string, ...presetArguments: any[]): Promise<void>;
    export function remove(): Promise<void>;
}