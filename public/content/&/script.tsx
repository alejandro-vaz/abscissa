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
(window as any)._ = (window as any)._ || {};
(window as any)._.remove = async() => {
    origin.classList.remove("_");
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    // FUNCTION -> STYLES
    origin.classList.add("_");
    // FUNCTION -> INTERFACE
    await General.modulator(
        "tooltip"
    )
    // FUNCTION -> WINDOW
    General.setTitle("Abscissa");
    General.setDescription("Landing page.");
    // FUNCTION -> REDIRECT
    General.redirect("dashboard");
}