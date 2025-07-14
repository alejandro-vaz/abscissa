//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";

// HEAD -> CONNECTIONS
const origin = General.connect("main");


//
//  REMOVE
//

// REMOVE -> PROCESS
(window as any)._ = (window as any)._ || {};
(window as any)._.remove = () => {}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    General.redirect("dashboard");
}