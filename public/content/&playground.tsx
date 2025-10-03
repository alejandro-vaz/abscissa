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

// CONTENT -> INITIAL CODE
const CODE = `# ARITHMETIC
x == 2 * 3
y = 2x^2^ - 4x + 7

# VECTORS
vector = [0, 1]

# LIMITS
e == lim alpha -> inf of (1 + 1 / alpha)^alpha^

# WRITE...
`

// CONTENT -> FUNCTION
export default function $_playground(): ß.react.ReactNode {
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        $.setTitle("Playground | Abscissa");
        $.setDescription("Interactive Mathsys playground that transpiles to LaTeX.");
    }, []);
    // FUNCTION -> RETURN
    return (
        <ß.$Main navbar="$Usual" background="$Solid">
            <div className="w-full h-full flex flex-col p-6 pt-0">
                <Mathsys.$Playground code={CODE} width="w-full" height="h-5/6"/>
                <div className="text-center items-center mt-5 h-1/6">
                    <h2 className="text-3xl mb-5">Suggest a feature</h2>
                    <ß.Button.$CallToAction text="Feature dashboard" width="w-48" redirect="https://abscissa.featurebase.app"/>
                </div>
            </div>
        </ß.$Main>
    )
}