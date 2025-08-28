//
//  HEAD
//

// HEAD -> MODULES
import * as dicebearCore from "@dicebear/core/lib/core.js";
import * as identicon from "@dicebear/identicon";

//
//  DICEBEAR
//

// DICEBEAR -> ICON
export function icon(username: string): string {
  return `data:image/svg+xml;base64,${btoa(
    String.fromCharCode(
      ...new TextEncoder().encode(
        dicebearCore
          .createAvatar(identicon, {
            seed: username,
          })
          .toString(),
      ),
    ),
  )}`;
}
