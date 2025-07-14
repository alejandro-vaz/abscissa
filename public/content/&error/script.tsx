//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";

// HEAD -> ORIGIN
const origin = General.connect("main");


//
//  REMOVE
//

// REMOVE -> PROCESS
(window as any)._error = (window as any)._error || {};
(window as any)._error.remove = () => {}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {}