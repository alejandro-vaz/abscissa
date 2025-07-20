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
(window as any)._error.remove = async() => {
    origin.classList.remove("_error");
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    // FUNCTION -> STYLES
    origin.classList.add("_error");
    // FUNCTION -> INTERFACE
    await General.modulator(
        "topbar"
    )
    // FUNCTION -> WINDOW
    let title;
    let description;
    switch (+General.SUG.VWD[1]) {
        case 0:
            title = "Error 0";
            description = "Vertical screen error.";
            break;
        default:
            title = "Error";
            description = "Unknown error.";
    }
    General.setTitle(title);
    General.setDescription(description);
}