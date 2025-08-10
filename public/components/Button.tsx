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
    {text, onClick, onContextMenu, id, tooltip, disabled}: {
        text: string,
        onClick?: () => void,
        onContextMenu?: () => void,
        id: string,
        tooltip: string,
        disabled?: boolean
    }
): ß.ReactElement {
    return (
        <ß.button
            id={id}
            className="button"
            onClick={onClick}
            onContextMenu={onContextMenu}
            tooltip={tooltip}
            initial={{borderColor: "#FFFFFF", color: "#FFFFFF", backgroundColor: "#0000004F", cursor: "pointer"}}
            disabled={disabled}
            animate={disabled ? {backgroundColor: "#000000", cursor: "default"} : {}}
            whileHover={disabled ? {} : {backgroundColor: "#111111"}}
            whileTap={disabled ? {} : {borderColor: "#7f7fd2", color: "#7f7fd2"}}
            transition={{duration: 0.1, ease: "easeInOut"}}
        >
            {text}
        </ß.button>
    )
}