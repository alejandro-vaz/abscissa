//
//  BASE
//

// BASE -> GENERAL
declare module "$" {
    // GENERAL -> WINDOW MANAGEMENT
    export function locate(): string[];
    export function redirect(target: string, append?: boolean, divide?: boolean): void;
    export function getTitle(): string
    export function setTitle(newTitle: string): void;
    export function getDescription(): string
    export function setDescription(newDescription: string): void;
    // GENERAL -> INTERFACE MANAGEMENT
    export function modulator(...activate: string[]): void;
    // GENERAL -> API
    export function curl<Request, Response>(script: string, data?: Request): Promise<Response>
    // GENERAL -> TIME
    export function delay(seconds: number): Promise<void>;
    // GENERAL -> REGEX
    export function check(input: string, pattern: RegExp): boolean;
    // GENERAL -> DEBUG
    export function debug(...variables: any[]): void;
}

// BASE -> SUG
declare module "SUG" {
    // SUG -> SUPERGLOBALS
    export const TAG: string;
    export const PAT: {
        Uemail: RegExp,
        Uhashpass: RegExp,
        Uname: RegExp
    }
}