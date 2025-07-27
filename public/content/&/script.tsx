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
        "tooltip"
    )
    // FUNCTION -> WINDOW
    General.setTitle("Abscissa");
    General.setDescription("Landing page.");
    // FUNCTION -> CONTENT
    await General.inject(General.origin, 
        <>
            <h1>LeetCode but for math</h1>
            <h3>Learn math by solving real problems</h3>
            <input 
                type="button" 
                value="Try it now"
                onClick={async() => await General.redirect("/playground")}
            />
        </>
    )
}