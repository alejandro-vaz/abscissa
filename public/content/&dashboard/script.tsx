//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import * as Mathsys from "#mathsys";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_dashboard(): ß.ReactNode {
    // FUNCTION -> VARIABLES
    const [data, setData] = ß.useState(null);
    ß.useEffect(async() => {
        setData(await $.curl("problem/lookup", {Pid: "00000000"}));
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
            <div class="problem" id="Daily" onClick={async() => await $.redirect("/problem/00000000")} tooltip="yeah">
                <div id="Wrapper">
                    <h3 id="Title">{data ? data.Pdataen.title : null}</h3>
                    <div id="Data">
                        <div id="Description" ref={ß.mount(async(node) => data ? await Mathsys.view(data.Pdataen.instructions, node) : null)}></div>
                        <img id="Image"/>
                    </div>
                </div>
            </div>
        </div>
    )
}