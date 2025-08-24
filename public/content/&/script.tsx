//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";

// HEAD -> COMPONENTS
import $Button from "ßButton";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_(): ß.ReactNode {
    // FUNCTION -> INTERFACE
    $.modulator(
        "tooltip",
        "topbar"
    )
    $.setTitle("Abscissa");
    $.setDescription("Landing page.");
    // FUNCTION -> CONTENT
    return ( 
        <>
            <h1>LeetCode but for math</h1>
            <h3>Learn math by solving real problems</h3>
            <$Button
                text="Try it now"
                onClick={async() => await $.redirect("/playground")}
                id="CTA"
                data-tooltip="Try it now"
            />
        </>
    )
}