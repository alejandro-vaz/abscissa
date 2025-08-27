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
    {id, name, placeholder, disabled}: {
        id: string,
        name: string,
        placeholder?: boolean,
        disabled?: boolean
    }
): ß.ReactElement {
    return (
        <input 
            type="password" 
            name={name} 
            className="input-password"
            id={id} 
            autoComplete="off"
            placeholder={placeholder ? `${name}...` : null}
            disabled={disabled}
        />
    )
}