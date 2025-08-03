//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";


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
        "topbar"
    )
    // FUNCTION -> WINDOW
    let code;
    let description;
    let condition;
    if ($.SUG.VWD[0] === "error") {
        condition = +$.SUG.VWD[1];
    } else {
        condition = null;
    }
    switch (condition) {
        case 0:
            code = 0;
            description = "Vertical screen error.";
            break;
        default:
            code = 404;
            description = "Not found.";
    }
    $.setTitle("Error");
    $.setDescription(description);
    // FUNCTION -> CONTENT
    await $.inject($.SUG.ORG,
        <>
            <h2>{code}</h2>
            <p>{description}</p>
        </>
    )
}