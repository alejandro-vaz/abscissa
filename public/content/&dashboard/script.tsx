//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as $ from "$";
/* @ts-ignore */import * as Render from "#render";


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
    $.setTitle("Dashboard");
    $.setDescription("Here is where the magic happens.");
    // FUNCTION -> CONTENT
    const data = await $.curl("problem/lookup", {Pid: "00000000"}) as any;
    const info = await $.curl("problem/lookup", {Pid: "00000001"}) as any;
    await $.inject($.SUG.ORG,
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