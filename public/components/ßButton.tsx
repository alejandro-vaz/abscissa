//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";

//
//  BUTTON
//

// BUTTON -> ELEMENT
export default function $Button({
  text,
  onClick,
  onContextMenu,
  disabled,
  type,
}: {
  text: string;
  onClick?: () => any;
  onContextMenu?: () => any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}): ß.react.ReactElement {
  return (
    <ß.motion.motion.button
      className="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      initial={{
        borderColor: "#FFFFFF",
        color: "#FFFFFF",
        backgroundColor: "#0000004F",
        cursor: "pointer",
      }}
      disabled={disabled}
      animate={
        disabled ? { backgroundColor: "#000000", cursor: "default" } : {}
      }
      whileHover={disabled ? {} : { backgroundColor: "#111111" }}
      whileTap={disabled ? {} : { borderColor: "#7f7fd2", color: "#7f7fd2" }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      type={type}
    >
      <ß.motion.AnimatePresence initial={false} mode="popLayout">
        <ß.motion.motion.span
          key={text}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          {text}
        </ß.motion.motion.span>
      </ß.motion.AnimatePresence>
    </ß.motion.motion.button>
  );
}
