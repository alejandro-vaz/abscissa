//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  INPUTSUBMIT
//

// INPUTSUBMIT -> ELEMENT
export default function $InputSubmit(
    {id, text, ["data-tooltip"]: dataTooltip, disabled}: {
        id: string,
        text: string,
        "data-tooltip": string,
        disabled?: boolean
    }
): ß.ReactElement {
    return (
        <ß.input
            type="submit" 
            id={id}
            class="input-submit"
            initial={{borderColor: "#FFFFFF", color: "#FFFFFF", backgroundColor: "#0000004F", cursor: "pointer"}}
            animate={disabled ? {backgroundColor: "#000000", cursor: "default"} : {}}
            whileHover={disabled ? {} : {backgroundColor: "#111111"}}
            whileTap={disabled ? {} : {borderColor: "#7f7fd2", color: "#7f7fd2"}}
            transition={{duration: 0.1, ease: "easeInOut"}}
            value={text}
            data-tooltip={dataTooltip}
            disabled={disabled}
        />
    )
}