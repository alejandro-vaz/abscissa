//
//  HEAD
//

// HEAD -> TOOLS
import * as $ from "$";
import * as ß from "ß";


//
//  BUTTON
//

// BUTTON -> SMALL
export default function $Small({text, tooltip, className, action}: {
    text: string,
    tooltip?: string,
    className?: string,
    action: () => any
}): ß.react.ReactNode {
    const [clicks, setClicks] = ß.react.useState<number>(0);
    return (
        <ß.motion.motion.button
            className={`${className} h-fit overflow-hidden rounded-md bg-white/10 px-3 py-1 text-sm`}
            onClick={() => {
                (async() => {
                    setClicks(click => click + 1);
                    action();
                    await $.delay(1)
                    setClicks(click => click - 1);
                })()
            }}
            initial={{cursor: "default", backgroundColor: "#ffffff19"}}
            whileHover={{cursor: "pointer", backgroundColor: "#ffffff30"}}
            transition={{duration: 0.1}}
        >
            <ß.motion.AnimatePresence initial={false} mode="wait">
                <ß.motion.motion.span
                    className="whitespace-nowrap block text-sm text-white"
                    key={clicks !== 0 && tooltip ? "tooltip" : "text"}
                    initial={tooltip ? {y: clicks !== 0 ? 15 : -15, opacity: 0} : {y: 0}}
                    animate={tooltip ? {y: 0, opacity: 1} : {y: 0, opacity: 1}}
                    exit={tooltip ? {y: clicks !== 0 ? 15 : -15, opacity: 0} : {y: 0}}
                    transition={{duration: 0.15, ease: [0.5, -0.5, 0.5, 1.5]}}
                >
                    {clicks !== 0 && tooltip ? tooltip : text}
                </ß.motion.motion.span>
            </ß.motion.AnimatePresence>
        </ß.motion.motion.button>
    )
}