//
//  HEAD
//

// HEAD -> TOOLS
import * as $ from "$";
import * as ß from "ß";


//
//  BUTTON
//

// BUTTON -> CALLTOACTION
export default function $CallToAction({text, tooltip, disabled, type, width, redirect}: {
    text: string,
    tooltip?: string,
    disabled?: boolean,
    type?: "button" | "submit" | "reset",
    width: string,
    redirect: string
}): ß.react.ReactNode {
    const [hover, setHover] = ß.react.useState(false);
    return (
        <ß.motion.motion.button
            className={`${width} h-fit overflow-hidden px-3 py-3 font-bold bg-black items-center justify-center border-primary-200 border-2 rounded-xl hover:cursor-pointer`}
            onClick={() => $.redirect(redirect, false)}
            onContextMenu={() => $.redirect(redirect, true)}
            disabled={disabled}
            type={type}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <ß.motion.AnimatePresence initial={false} mode="wait">
                <ß.motion.motion.span
                    className="whitespace-nowrap block text-lg"
                    key={hover && tooltip ? "tooltip" : "text"}
                    initial={tooltip ? {y: hover ? 30 : -30, color: "#4d4da0"} : {y: 0, color: "#4d4da0"}}
                    animate={tooltip ? {y: 0, color: "#ffffff"} : {y: 0, color: "#ffffff"}}
                    exit={tooltip ? {y: hover ? 30 : -30, color: "#4d4da0"} : {y: 0, color: "#4d4da0"}}
                    transition={{duration: 0.15, ease: [0.5, -0.5, 0.5, 1.5]}}
                >
                    {hover && tooltip ? tooltip : text}
                </ß.motion.motion.span>
            </ß.motion.AnimatePresence>
        </ß.motion.motion.button>
    )
}