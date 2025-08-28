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
export default function $_playground(): ß.react.ReactNode {
    // FUNCTION -> INTERFACE
    ß.react.useEffect(() => {
        $.setTitle("Playground");
        $.setDescription("Experiment with Mathsys.");
    }, []);
    // FUNCTION -> CONTENT
    return (
        <div className="w-screen h-screen flex flex-col p-6">
            <Mathsys.$Playground code="hello"/>
        </div>
    )
}