//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as dicebearCore from "€@dicebear/core";
/* @ts-ignore */import * as identicon from "€@dicebear/identicon";


//
//  DICEBEAR
//

// DICEBEAR -> IDENTICON
export function identicon(username: string) {
    return `data:image/svg+xml;base64,${btoa(String.fromCharCode(...(new TextEncoder().encode(dicebearCore.createAvatar(
        identicon, 
        {
            seed: username
        }
    ).toString()))))}`;
}