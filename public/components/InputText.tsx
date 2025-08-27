//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  INPUTTEXT
//

// INPUTTEXT -> ELEMENT
export default function $InputText(
    {id, name, placeholder, disabled}: {
        id: string,
        name: string,
        placeholder?: boolean,
        disabled?: boolean
    }
): ß.ReactElement {
    return (
        <input 
            type="text" 
            autoComplete="off"
            className="input-text"
            placeholder={placeholder ? `${name}...` : null}
            name={name}
            id={id}
            disabled={disabled}
        />
    )
}