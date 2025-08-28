//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";

// HEAD -> COMPONENTS
import $Button from "ßButton";
import Silk from "ßBackgrounds/Silk";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_(): ß.react.ReactNode {
    // FUNCTION -> INTERFACE
    ß.react.useEffect(() => {
        $.setTitle("Abscissa");
        $.setDescription("LeetCode but for math. Learn math by solving real problems.");
    }, []);
    // FUNCTION -> CONTENT
    return ( 
        <>
            <Silk 
                speed={3}
                scale={1}
                color="#4D4DA0"
                noiseIntensity={1.0}
                rotation={0.1}
            />
            <div className="w-screen h-screen flex flex-col items-center text-center p-6">
                <h1>LeetCode but for math</h1>
                <h3>Learn math by solving real problems</h3>
                <$Button
                    text="Try it now"
                    onClick={() => $.redirect("/playground")}
                    data-tooltip="Try it now"
                />
            </div>
        </>
    )
}
