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
(window as any)._dashboard = (window as any)._dashboard || {};
(window as any)._dashboard.remove = () => {}    


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    // FUNCTION -> INTERFACE
    await General.interfaceModulator(
        "navbar",
        "tooltip",
        "topbar"
    )
    // FUNCTION -> WINDOW
    General.setTitle("Dashboard");
    General.setDescription("Here is where the magic happens.");
}