//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import katex from "katex/contrib/auto-render.js";
import * as codemirrorState from "@codemirror/state";
import * as codemirrorView from "@codemirror/view";
import * as codemirrorCommands from "@codemirror/commands";


//
//  MATHSYS
//

// MATHSYS -> PLAYGROUND
export function $Playground({code, width, height}: {
    code: string,
    width: string,
    height: string
}): ß.react.ReactNode {
    // PLAYGROUND -> USESTATE
    const [queue, setQueue] = ß.react.useState<number>(0);
    const [text, setText] = ß.react.useState<string>("");
    const [output, setOutput] = ß.react.useState<string>("");
    // PLAYGROUND -> USEREF
    const via = ß.react.useRef<$.via>(null);
    const editorContainer = ß.react.useRef<HTMLDivElement>(null);
    const outputContainer = ß.react.useRef<HTMLDivElement>(null);
    // PLAYGROUND -> USEEFFECT
    ß.react.useEffect(() => {
        via.current = new $.via("mathsys/compile", (data: MathsysCompileResponse) => {
            setQueue(value => value - 1);
            setOutput(data.output);
        });
        const outputListener = codemirrorView.EditorView.updateListener.of((update) => update.docChanged ? setText(update.state.doc.toString()) : null);
        const temporalState = codemirrorState.EditorState.create({
            doc: code,
            extensions: [
                codemirrorView.keymap.of(codemirrorCommands.historyKeymap),
                codemirrorView.EditorView.theme(
                    {
                        "&": {
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            borderRadius: "1vw",
                            overflow: "hidden",
                            height: "100%"
                        },
                        ".cm-content": {
                            caretColor: "#ffffff",
                        },
                        ".cm-cursor": {
                            borderLeftColor: "#ffffff",
                        },
                        ".cm-activeLine": {
                            backgroundColor: "#111111",
                        },
                        ".cm-lineNumbers": {
                            backgroundColor: "#111111",
                            color: "#333333",
                            width: "4ch",
                            textAlign: "right",
                        },
                        ".cm-scroller": {
                            scrollbarWidth: "none",
                        },
                    },
                    { dark: true },
                ),
                outputListener,
                codemirrorView.lineNumbers(),
                codemirrorView.highlightActiveLine(),
                codemirrorCommands.history(),
                codemirrorView.EditorView.lineWrapping,
            ],
        });
        new codemirrorView.EditorView({
            state: temporalState,
            parent: editorContainer.current
        });
        setText(code);
        return () => via.current ? via.current.close() : null;
    }, []);
    ß.react.useEffect(() => {
        setQueue(value => value + 1);
        via.current.send<MathsysCompileRequest>({Mcode: text});
    }, [text])
    ß.react.useEffect(() => {
        if (queue === 0) {render(output, outputContainer.current, true)}
    }, [output, queue])
    return (
        <div className={`flex flex-row ${width} ${height}`}>
            <div className="flex-none w-1/2" ref={editorContainer}></div>
            <div className="flex-none w-1/2 relative">
                <ß.Suspense.$Spinner show={queue === 0} className="h-full w-full">
                    <span className="items-center" ref={outputContainer}></span>
                </ß.Suspense.$Spinner>
            </div>
        </div>
    );
}

// MATHSYS -> KATEX
export function render(code: string, element: HTMLElement, display: boolean): void {
    element.textContent = code;
    katex(element, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: display },
        ],
        strict: false,
        throwOnError: false,
    });
}