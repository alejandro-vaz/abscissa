//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as Render from "#render";


//
//  REMOVE
//

// REMOVE -> FUNCTION
export async function hide(): Promise<void> {
    await $.inject($.SUG.ORG, <></>);
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export async function show(): Promise<void> {
    // FUNCTION -> INTERFACE
    await $.modulator(
        "navbar",
        "tooltip",
        "topbar"
    )
    // FUNCTION -> WINDOW
    $.setTitle("Playground");
    $.setDescription("Experiment with Mathsys.");
    // FUNCTION -> CONTENT
    await $.inject($.SUG.ORG,
        <>
            <div id="EditorContainer" ref={async(node) => Render.playground("# MATHSYS FEATURES\n# \n# 1. basic arithmetic\n2 + 2\nx = 38 - 5\nvar = 27·2\ny - 5 = 3*x/2\n\n# \n# 2. vectors\nhello = []\nworld = [1, 0]\n\n#\n# 3. exponentiation\ny = x^2^\nn = x^x^x^^\n\n#\n# that's pretty much it for now\n# i deploy an update every Sunday\n# sometimes with a new mathsys version\n# this is mathsys 0.10.2", node, await $.connect("Main/Output"))}></div>
            <div id="Output"></div>
        </>
    )
}