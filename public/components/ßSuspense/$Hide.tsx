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
}): ß.react.ReactElement {
    return (
        show ? (
            <ß.motion.motion.div className={className}>
                {children}
            </ß.motion.motion.div>
        ) : (null)
    );
}