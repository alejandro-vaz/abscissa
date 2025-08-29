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
    const [ready, setReady] = ß.react.useState<boolean>(false);
    const [output, setOutput] = ß.react.useState<string>("");
    const editorContainerRef = ß.react.useRef<HTMLDivElement>(null);
    const outputContainerRef = ß.react.useRef<HTMLDivElement>(null);
    const editorInitializedRef = ß.react.useRef<boolean>(false);
    const debounceTimerRef = ß.react.useRef<number | null>(null);
    const isCompilingRef = ß.react.useRef<boolean>(false);
    ß.react.useEffect(() => {
        let isActive = true;
        (async() => {
            setReady(false);
            const compiled = await compile(code);
            if (!isActive) {return}
            setOutput(compiled);
            setReady(true);
        })();
        return () => {isActive = false};
    }, [code]);
    ß.react.useEffect(() => {
        if (editorInitializedRef.current) {return}
        if (!editorContainerRef.current) {return}
        const outputListener = codemirrorView.EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                if (debounceTimerRef.current !== null) {
                    window.clearTimeout(debounceTimerRef.current);
                }
                debounceTimerRef.current = window.setTimeout(async() => {
                    if (isCompilingRef.current) { return; }
                    isCompilingRef.current = true;
                    setReady(false);
                    const compiled = await compile(update.state.doc.toString());
                    setOutput(compiled);
                    setReady(true);
                    isCompilingRef.current = false;
                }, 250);
            }
        });
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
            parent: editorContainerRef.current,
        });
        editorInitializedRef.current = true;
        return () => {
            if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);
    ß.react.useEffect(() => {
        if (!outputContainerRef.current) {return}
        render(output, outputContainerRef.current, true);
    }, [output, ready]);
    return (
        <div className={`flex flex-row ${width} ${height}`}>
            <div className="flex-none w-1/2" ref={editorContainerRef}></div>
            <div className="flex-none w-1/2 relative">
                <ß.Suspense.$Spinner show={ready} className="h-full w-full">
                    <span className="items-center" ref={outputContainerRef}></span>
                </ß.Suspense.$Spinner>
            </div>
        </div>
    );
}

// MATHSYS -> COMPILE
export async function compile(code: string): Promise<string> {
    return (
        await $.curl<MathsysCompileRequest, MathsysCompileResponse>("mathsys/compile", {Mcode: code})).output;
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