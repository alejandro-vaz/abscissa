//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import * as Mathsys from "#mathsys";

// HEAD -> COMPONENTS
import $Suspense from "ßSuspense";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_playground(): ß.ReactNode {
    // FUNCTION -> INTERFACE
    $.modulator(
        "navbar",
        "tooltip",
        "topbar"
    )
    $.setTitle("Playground");
    $.setDescription("Experiment with Mathsys.");
    // FUNCTION -> CONTENT
    return (
        <Mathsys.$Playground id="EditorContainer" code="hello"/>
    )
}