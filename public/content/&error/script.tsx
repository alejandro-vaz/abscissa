//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as $ from "$";


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
    switch (+$.SUG.VWD[1]) {
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