//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import * as Mathsys from "#mathsys";

// HEAD -> COMPONENTS
import $Editor from "ßEditor";

//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_playground(): Promise<ß.ReactNode> {
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
        <>
            <$Editor initial="# Mathsys features" id="EditorContainer" output="Main/Output"/>
            <div id="Output"></div>
        </>
    )
}