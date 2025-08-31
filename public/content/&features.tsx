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
export default function $_features(): ß.react.ReactNode {
    // FUNCTION -> USESTATE
    const [cards, setCards] = ß.react.useState([]);
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        $.setTitle("Features | Abscissa");
        $.setDescription("Discover the features of Abscissa math learning platform.");
    }, []);
    return (<>
        <div className="w-screen h-screen flex flex-col items-center text-center p-6 pt-16">
            <h1 className="text-4xl font-bold pb-5">Not yet developed</h1>
            <h3 className="text-sm">I'm on my way though</h3>
            <h3 className="text-sm">This is going to be the first feature fr</h3>
        </div>
    </>)
}