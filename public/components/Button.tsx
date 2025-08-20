//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  BUTTON
//

// BUTTON -> ELEMENT
export default function $Button(
    {text, onClick, onContextMenu, id, ["data-tooltip"]: dataTooltip, disabled, type}: {
        text: string,
        onClick?: () => any,
        onContextMenu?: () => any,
        id: string,
        "data-tooltip": string,
        disabled?: boolean
        type?: string
    }
): ß.ReactElement {
    return (
        <ß.button
            id={id}
            className="button"
            onClick={onClick}
            onContextMenu={onContextMenu}
            data-tooltip={dataTooltip}
            initial={{borderColor: "#FFFFFF", color: "#FFFFFF", backgroundColor: "#0000004F", cursor: "pointer"}}
            disabled={disabled}
            animate={disabled ? {backgroundColor: "#000000", cursor: "default"} : {}}
            whileHover={disabled ? {} : {backgroundColor: "#111111"}}
            whileTap={disabled ? {} : {borderColor: "#7f7fd2", color: "#7f7fd2"}}
            transition={{duration: 0.1, ease: "easeInOut"}}
            type={type}
        >
            <ß.AnimatePresence initial={false} mode="popLayout">
                <ß.span
                    key={text}
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: -10, opacity: 0}}
                    transition={{duration: 0.1, ease: "easeInOut"}}
                >
                    {text}
                </ß.span>
            </ß.AnimatePresence>
        </ß.button>
    )
}