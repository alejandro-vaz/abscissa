//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_error(): Promise<ß.ReactNode> {
    // FUNCTION -> VARIABLES
    const [code, setCode] = ß.useState(404);
    const [description, setDescription] = ß.useState("Not found.");
    try {
        switch (+$.SUG.VWD[1]) {
            case 0: {
                setCode(0);
                setDescription("Vertical screen error.");
            }
        }
    } catch {}
    // FUNCTION -> INTERFACE
    $.modulator(
        "topbar"
    )
    $.setTitle(`Error ${code}`);
    $.setDescription(description);
    // FUNCTION -> CONTENT
    return (
        <>
            <h2>{code}</h2>
            <p>{description}</p>
        </>
    )
}