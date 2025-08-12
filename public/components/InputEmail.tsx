//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  INPUTEMAIL
//

// INPUTEMAIL -> ELEMENT
export default function $InputEmail(
    {id, name, placeholder}: {
        id: string,
        name: string,
        placeholder?: boolean
    }
): ß.ReactElement {
    return (
        <input 
            type="email" 
            name={name}
            id={id}
            class="input-email"
            placeholder={placeholder ? `${name}...` : null}
            autoComplete="off"
        />
    )
}