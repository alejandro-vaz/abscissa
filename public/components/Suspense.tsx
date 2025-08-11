//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  SUSPENSE
//

// SUSPENSE -> ELEMENT
export default function $Suspense(
    {}: {}
): ß.ReactElement {
    return (
        <ß.span
            initial={{opacity: 0.35}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, repeat: Infinity, repeatType: "reverse"}}
        >
            Loading...  
        </ß.span>
    )
}