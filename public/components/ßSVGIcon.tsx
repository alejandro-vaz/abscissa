//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

//
//  SVGICON
//

// SVGICON -> ELEMENT
export default function $SVGIcon({
  path,
  onClick,
  onContextMenu,
  id,
}: {
  path: string;
  onClick?: () => any;
  onContextMenu?: () => any;
  id: string;
}): ß.ReactElement {
  return (
    <ß.button
      id={id}
      className="svg-icon"
      onClick={onClick}
      onContextMenu={onContextMenu}
      initial={{ borderWidth: "0.2vw" }}
      whileHover={{ borderWidth: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <img id="Image" src={path} />
    </ß.button>
  );
}
