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
export default function $_dashboard(): ß.ReactNode {
    // FUNCTION -> VARIABLES
    const [data, setData] = ß.useState<ProblemLookupResponse>(null);
    const [view, setView] = ß.useState<string>(null);
    const [ready, setReady] = ß.useState<boolean>(false);
    ß.onRender(async() => {
        const _data = await $.curl<ProblemLookupRequest, ProblemLookupResponse>("problem/lookup", {Pid: "00000000"});
        setData(_data);
        setView(await Mathsys.view(_data.Pdataen.instructions));
        setReady(true);
    })
    // FUNCTION -> INTERFACE
    $.modulator(
        "navbar",
        "tooltip",
        "topbar"
    )
    $.setTitle("Dashboard");
    $.setDescription("Here is where the magic happens.");
    // FUNCTION -> CONTENT
    return (
        <div id="Container">
            <h2>Jump right in</h2>
            <div 
                class="problem" 
                id="Daily" 
                onClick={async() => await $.redirect("/problem/00000000")}  
                data-tooltip="yeah"
            > 
                <div id="Wrapper">
                    <$Suspense show={ready} id="Suspense">
                        <h3 id="Title">{ready ? data.Pdataen.title : null}</h3>
                        <div id="Data">
                            <div 
                                id="Description"
                                ref={ß.mount((node) => Mathsys.render(view, node, true))}
                            ></div>
                            <img id="Image"/>
                        </div>
                    </$Suspense>
                </div>
            </div>
        </div>
    )
}