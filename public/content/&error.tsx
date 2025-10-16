//
//  HEAD
//

// HEAD -> MODULES
import * as ß from "ß";


//
//  CONTENT
//

// CONTENT -> ERRORS
const ERRORS = {
    0: "Unknown error.",
    404: "Not found."
} as {[key: number]: string}

// CONTENT -> FUNCTION
export default function $_error(): ß.react.ReactNode {
    // FUNCTION -> USESTATE
    const [error, setError] = ß.react.useState<number>(0);
    const [show, setShow] = ß.react.useState<boolean>(false);
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        const location = ß.locate();
        if (location[0] === "error") {
            try {
                if (+location[1] in ERRORS) {setError(+location[1])}
            } catch {
                setError(0);
            }
        } else {
            setError(404);
        }
        setShow(true);
    }, []);
    ß.react.useEffect(() => {
        ß.setTitle(`Error ${error} | Abscissa`);
        ß.setDescription(`An error occurred on Abscissa: ${ERRORS[error]}`);
    }, [error]);
    // FUNCTION -> RETURN
    return (
        <ß.$Main background="$Solid">
            <div className="w-full h-full flex flex-col items-center text-center p-6 pt-16">
                <ß.Suspense.$Hide show={show} className="w-full h-full">
                    <h1 className="text-3xl font-bold mb-5">{error}</h1>
                    <p className="text-xl">{ERRORS[error]}</p>
                </ß.Suspense.$Hide>
            </div>
        </ß.$Main>
    )
}
