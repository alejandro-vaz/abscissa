//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";
import * as Render from "../../modules/app/render/script.js";


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
        "navbar",
        "tooltip",
        "topbar"
    )
    // FUNCTION -> WINDOW
    General.setTitle("Dashboard");
    General.setDescription("Here is where the magic happens.");
    // FUNCTION -> CONTENT
    const data = await General.curl("problem/lookup", {Pid: "00000000"}) as any;
    const info = await General.curl("problem/lookup", {Pid: "00000001"}) as any;
    await General.inject(General.origin,
        <>
            <div id="Container">
                <h2>Jump right in</h2>
                <div class="problem" id="Daily">
                    <div id="Wrapper">
                        <h3 id="Title">{data.Pdataen.title}</h3>
                        <div id="Data">
                            <div id="Description" ref={async(node) => await Render.string(data.Pdataen.instructions, node)}></div>
                            <img id="Image"/>
                        </div>
                    </div>
                </div>
                <div class="problem" id="Random">
                    <div id="Wrapper">
                        <h3 id="Title">{info.Pdataen.title}</h3>
                        <div id="Data">
                            <div id="Description" ref={async(node) => await Render.string(info.Pdataen.instructions, node)}></div>
                            <img id="Image"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}