//
//  HEAD
//

// HEAD -> MODULES
import * as ß from "ß";
import * as Mathsys from "#mathsys";


//
//  CONTENT
//

// CONTENT -> INITIAL CODE
const CODE = `# full syntax guide: https://docs.abscissa.eu/Mathsys/Learn
# ARITHMETIC
x == 2 * 3
y = 2x^2^ - 4x + 7

# VECTORS
vector = [0, 1]

# LIMITS
e == lim n->inf of (1 + 1 / n)^n^

# WRITE YOUR OWN MATH...
`

// CONTENT -> FUNCTION
export default function $_playground(): ß.react.ReactNode {
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        ß.setTitle("Playground | Abscissa");
        ß.setDescription("Interactive Mathsys playground that transpiles to LaTeX.");
    }, []);
    // FUNCTION -> RETURN
    return (
        <ß.$Main navbar="$Usual" background="$Solid">
            <Mathsys.$Playground code={CODE} className="w-full h-full p-6 pt-0" paper copy/>
        </ß.$Main>
    )
}