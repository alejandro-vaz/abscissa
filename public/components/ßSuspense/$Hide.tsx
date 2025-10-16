//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  SUSPENSE
//

// SUSPENSE -> HIDE
export default function $Hide({show, children, className}: {
    show: boolean,
    children?: ß.react.ReactNode,
    className?: string
}): ß.react.ReactNode {
    return (
        <div
            className={`${className} relative overflow-hidden`}
        >
            {show ? children : <></>}
        </div>
    )
}