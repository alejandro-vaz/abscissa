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
    // FUNCTION -> CONST
    const code = `# Mathsys 0.10.2 features
#
# Arithmetic
x = 2 * 3
y = 2*x - 4
#
# Vectors
vector = [0, 1]
#
# Write your code ...
`
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        $.setTitle("Playground | Abscissa");
        $.setDescription("Interactive Mathsys playground that transpiles to LaTeX.");
    }, []);
    // FUNCTION -> RETURN
    return (
        <>
            <div className="w-screen h-screen flex flex-col p-6">
                <Mathsys.$Playground code={code} width="w-full" height="h-5/6"/>
                <div className="text-center items-center mt-5 h-1/6">
                    <h2 className="text-3xl mb-5">Suggest a feature</h2>
                    <ß.Button.$CallToAction text="Feature dashboard" width="w-48" redirect="/features"/>
                </div>
            </div>
        </>
    )
}