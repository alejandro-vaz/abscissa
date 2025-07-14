//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";
import * as Tooltip from "../../modules/interface/tooltip/script.js";
import * as Topbar from "../../modules/interface/topbar/script.js";

// HEAD -> ORIGIN
const origin = General.connect("main");


//
//  REMOVE
//

// REMOVE -> PROCESS
(window as any)._login = (window as any)._login || {};
(window as any)._login.remove = () => {
    Tooltip.deactivate();
    Topbar.deactivate();
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content() {
    // FUNCTION -> INTERFACE
    await Promise.all([
        Tooltip.activate(),
        Topbar.activate()
    ])
}