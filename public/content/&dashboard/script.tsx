//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";
import * as Navbar from "../../modules/interface/navbar/script.js";
import * as Tooltip from "../../modules/interface/tooltip/script.js";
import * as Topbar from "../../modules/interface/topbar/script.js";

// HEAD -> ORIGIN
const origin = General.connect("main");


//
//  REMOVE
//

// REMOVE -> PROCESS
(window as any)._dashboard = (window as any)._dashboard || {};
(window as any)._dashboard.remove = () => {
    Navbar.deactivate();
    Tooltip.deactivate();
    Topbar.deactivate();
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    // FUNCTION -> INTERFACE
    await Promise.all([
        Navbar.activate(),
        Tooltip.activate(),
        Topbar.activate()
    ])
}