//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

//
//  FORM
//

// FORM -> ELEMENT
export default function $Form({
  id,
  onSubmit,
  children,
}: {
  id: string;
  onSubmit: (event) => any;
  children?: ß.ReactNode;
}): ß.ReactElement {
  return (
    <form id={id} onSubmit={onSubmit} className="form" noValidate>
      {children}
    </form>
  );
}
