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
            <Mathsys.$Playground code="hello" width="w-full" height="h-5/6"/>
            <div className="text-center items-center mt-5 h-1/6">
                <h2 className="text-3xl mb-5">Suggest a feature</h2>
                <ß.Button.$CallToAction text="Feature dashboard" width="w-48" redirect="/features"/>
            </div>
        </div>
    )
}