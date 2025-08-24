//
//  VIEW
//

// VIEW -> &
declare module "&" {
    export default function $_(): import("ß").ReactNode;
}

// VIEW -> &DASHBOARD
declare module "&dashboard" {
    export default function $_dashboard(): import("ß").ReactNode;
}

// VIEW -> &ERROR
declare module "&error" {
    export default function $_error(): import("ß").ReactNode;
}

// VIEW -> &PLAYGROUND
declare module "&playground" {
    export default function $_playground(): import("ß").ReactNode;
}