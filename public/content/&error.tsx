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
export default function $_error(): ß.react.ReactNode {
    // FUNCTION -> VARIABLES
    const [code, setCode] = ß.react.useState<number>(0);
    const [description, setDescription] = ß.react.useState<string>("Unknown error.");
    ß.react.useEffect(() => {
        let data: [number, string];
        switch (+$.locate()[1]) {
            default: {data = [0, "Unknown error."]};
        }
        setCode(data[0]);
        setDescription(data[1]);
        $.setTitle(`Error ${data[0]}`);
        $.setDescription(data[1]);
    }, []);
    // FUNCTION -> CONTENT
    return (
        <>
            <h2>{code}</h2>
            <p>{description}</p>
        </>
    );
}
