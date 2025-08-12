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
    {id, name, placeholder}: {
        id: string,
        name: string,
        placeholder?: boolean
    }
): ß.ReactElement {
    return (
        <input 
            type="text" 
            autoComplete="off"
            class="input-text"
            placeholder={placeholder ? `${name}...` : null}
            name={name}
            id={id}
        />
    )
}