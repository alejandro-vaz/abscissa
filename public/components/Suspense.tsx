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
    {show, id, children}: {
        show: boolean,
        id: string,
        children?: ß.ReactNode
    }
): ß.ReactElement {
    return (
        <ß.AnimatePresence>
            {show ? (
                <ß.span
                    key="content"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    id={id}
                    transition={{duration: 0.1, delay: 0.1}}
                >
                    {children}
                </ß.span>
            ) : (
                <ß.span 
                    key="spinner"
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.1}}
                    className="suspense"
                >
                    <ß.div
                        id="Spinner"
                        initial={{rotate: 0, borderTopColor: "#4d4da0"}}
                        animate={{rotate: 360, borderTopColor: ["#4d4da0", "#7f7fd2", "#4d4da0"]}}
                        transition={{duration: 1, repeat: Infinity, repeatType: 'loop', ease: 'linear'}}
                    >
                    </ß.div>
                </ß.span>
            )}
        </ß.AnimatePresence>
    );
}