//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

//
//  SUSPENSE
//

// SUSPENSE -> ELEMENT
export default function $Suspense({show, children}: {
    show: boolean;
    children?: ß.react.ReactNode;
}): ß.react.ReactElement {
    return (
        <ß.motion.AnimatePresence>
            {show ? (
                <ß.motion.motion.span
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.1 }}
                >
                    {children}
                </ß.motion.motion.span>
            ) : (
                <ß.motion.motion.span
                    key="spinner"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50"
                >
                    <ß.motion.motion.div
                        className="w-6 h-6 border-solid border-4 rounded-full border-r-white border-l-white border-b-white"
                        initial={{ rotate: 0, borderTopColor: "#4d4da0" }}
                        animate={{
                            rotate: 360,
                            borderTopColor: ["#4d4da0", "#7f7fd2", "#4d4da0"],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    ></ß.motion.motion.div>
                </ß.motion.motion.span>
            )}
        </ß.motion.AnimatePresence>
    );
}
