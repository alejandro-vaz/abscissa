//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

//
//  INPUTEMAIL
//

// INPUTEMAIL -> ELEMENT
export default function $InputEmail({
  id,
  name,
  placeholder,
  disabled,
}: {
  id: string;
  name: string;
  placeholder?: boolean;
  disabled?: boolean;
}): ß.ReactElement {
  return (
    <input
      type="email"
      name={name}
      id={id}
      className="input-email"
      placeholder={placeholder ? `${name}...` : null}
      autoComplete="off"
      disabled={disabled}
    />
  );
}
