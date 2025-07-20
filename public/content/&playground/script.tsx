//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";
import * as Render from "../../modules/app/render/script.js";

// HEAD -> ORIGIN
const origin = General.connect("main");


//
//  REMOVE
//

// REMOVE -> PROCESS
(window as any)._playground = (window as any)._playground || {};
(window as any)._playground.remove = async() => {
    await General.inject(origin, <></>);
    origin.classList.remove("_playground");
}


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default async function content(): Promise<void> {
    // FUNCTION -> STYLES
    origin.classList.add("_playground");
    // FUNCTION -> INTERFACE
    await General.modulator(
        "navbar",
        "tooltip",
        "topbar"
    )
    // FUNCTION -> WINDOW
    General.setTitle("Playground");
    General.setDescription("Experiment with Mathsys.");
    // FUNCTION -> CONTENT
    let outputNode;
    await General.inject(origin,
        <>
            <div id="editor-container" ref={async(node: HTMLElement) => {
                await General.definition(() => outputNode);
                Render.playground(node, outputNode);
            }}></div>
            <div id="output" ref={(node) => outputNode = node}></div>
        </>
    )
}