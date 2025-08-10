//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  WORDAPPEARTEXT
//

// WORDAPPEARTEXT -> ELEMENT
export default function $WordAppearText(
    {text, id}: {
        text: string,
        id: string
    }
): ß.ReactElement {
    return (
        <p id={id} className="word-appear-text">
            {text.split(" ").map((word, index) => (
                <ß.span
                    key={index}
                    initial={{opacity: 0, y: 2}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.03, duration: 0.3}}
                >
                    {word}
                    {index < text.split(" ").length - 1 ? "\u00A0" : ""}
                </ß.span>
            ))}
        </p>
    )
}