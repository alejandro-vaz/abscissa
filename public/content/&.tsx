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
export default function $_(): ß.react.ReactNode {
    // FUNCTION -> INTERFACE
    ß.react.useEffect(() => {
        $.setTitle("Abscissa");
        $.setDescription("LeetCode but for math. Learn math by solving real problems.");
    }, []);
    // FUNCTION -> CONTENT
    return ( 
        <>
            <ß.Background.$Silk color="#1E1E40"/>
            <div className="w-screen h-screen flex flex-col items-center text-center p-6 pt-16">
                <h1 className="text-5xl mb-6 font-bold">LeetCode but for math</h1>
                <h3 className="text-xl mb-12">Learn math by solving real problems</h3>
                <ß.Button.$CallToAction
                    text="Try it now"
                    tooltip="Yes"
                    redirect="/playground"
                    width="w-32"
                />
            </div>
        </>
    )
}
