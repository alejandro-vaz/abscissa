//
//  HEAD
//

// HEAD -> MODULES
import * as dicebearCore from "@dicebear/core";
import * as dicebearIdenticon from "@dicebear/identicon";


//
//  DICEBEAR
//

// DICEBEAR -> ICON
export function icon(username: string): string {
    return `data:image/svg+xml;base64,${btoa(
        String.fromCharCode(...new TextEncoder().encode(dicebearCore.createAvatar(dicebearIdenticon, {
                        seed: username,
        }).toString()))
    )}`;
}
