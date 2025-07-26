//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";


//
//  REMOVE
//

// REMOVE -> FUNCTION
export async function hide(): Promise<void> {
    await General.inject(General.origin, <></>);
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export async function show(): Promise<void> {
    // FUNCTION -> INTERFACE
    await General.modulator(
        "topbar"
    )
    // FUNCTION -> WINDOW
    let code;
    let description;
    switch (+General.SUG.VWD[1]) {
        case 0:
            code = 0;
            description = "Vertical screen error.";
            break;
        default:
            code = 404;
            description = "Not found.";
    }
    General.setTitle("Error");
    General.setDescription(description);
    // FUNCTION -> CONTENT
    await General.inject(General.origin,
        <>
            <h2>{code}</h2>
            <p>{description}</p>
        </>
    )
}