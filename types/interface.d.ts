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