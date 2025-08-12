//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  INPUTPASSWORD
//

// INPUTPASSWORD -> ELEMENT
export default function $InputPassword(
    {id, name, placeholder}: {
        id: string,
        name: string,
        placeholder?: boolean
    }
): ß.ReactElement {
    return (
        <input 
            type="password" 
            name={name} 
            class="input-password"
            id={id} 
            autoComplete="off"
            placeholder={placeholder ? `${name}...` : null}
        />
    )
}