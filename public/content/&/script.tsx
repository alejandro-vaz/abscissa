//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";


//
//  REMOVE
//

// REMOVE -> FUNCTION
export async function hide(): Promise<void> {
    await ß.inject($.SUG.ORG, <></>);
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export async function show(): Promise<void> {
    // FUNCTION -> INTERFACE
    await $.modulator(
        "tooltip"
    )
    // FUNCTION -> WINDOW
    $.setTitle("Abscissa");
    $.setDescription("Landing page.");
    // FUNCTION -> CONTENT
    await ß.inject($.SUG.ORG, 
        <>
            <h1>LeetCode but for math</h1>
            <h3>Learn math by solving real problems</h3>
            <input 
                type="button" 
                value="Try it now"
                onClick={async() => await $.redirect("/playground", true)}
            />
        </>
    )
}