//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

// HEAD -> MODULES
import * as Mathsys from "#mathsys";


//
//  EDITOR
//

// EDITOR -> ELEMENT
export default function $Editor(
    {initial, id, output}: {
        initial: string,
        id: string,
        output: string
    }
): ß.ReactElement {
    return (
        <div
            id={id}
            ref={ß.mount(async(node) => {
                await Mathsys.playground(initial, node, await ß.connect(output))
            })}
        ></div>
    )
}