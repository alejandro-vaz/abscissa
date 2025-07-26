//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import * as General from "../../../content/general.js";
import * as Dicebear from "@dicebear/core";
import * as Identicon from "@dicebear/identicon";

// HEAD -> APP DICEBEAR
const origin = await General.connect("AppDicebear");


//
//  DICEBEAR
//

// DICEBEAR -> IDENTICON
export function identicon(username: string) {
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(Dicebear.createAvatar(Identicon, {seed: username}).toString())))}`;
}