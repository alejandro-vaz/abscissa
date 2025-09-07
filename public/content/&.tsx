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
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        $.setTitle("Abscissa");
        $.setDescription("LeetCode but for math. Learn math by solving real problems.");
    }, []);
    // FUNCTION -> RETURN
    return (
        <ß.$Main background="$Silk">
            <div className="w-full h-full flex flex-col items-center text-center p-6 pt-16">
                <h1 className="text-5xl mb-6 font-bold">LeetCode but for math</h1>
                <h3 className="text-xl mb-12">Learn math by solving real problems</h3>
                <ß.Button.$CallToAction
                    text="Try it now"
                    tooltip="Playground"
                    redirect="/playground"
                    width="w-32"
                />
            </div>
        </ß.$Main>
    )
}
