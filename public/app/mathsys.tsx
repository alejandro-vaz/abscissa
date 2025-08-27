//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import katex from "katex/contrib/auto-render.js";
import * as codemirrorState from '@codemirror/state';
import * as codemirrorView from '@codemirror/view';
import * as codemirrorCommands from '@codemirror/commands';

// HEAD -> COMPONENTS
import $Suspense from "ßSuspense";


//
//  MATHSYS
//

// MATHSYS -> PLAYGROUND
export function $Playground(
    {id, code}: {
        id: string,
        code: string
    }
): ß.ReactNode {
    const [ready, setReady] = ß.useState<boolean>(true);
    const [editor, setEditor] = ß.useState<boolean>(false);
    const [output, setOutput] = ß.useState<string>(null);
    ß.onRender(async() => {
        setReady(false);
        setOutput(await compile(code));
        setReady(true);
    })
    return (
        <div id={id} className="-mathsys-playground">
            <div id="Editor" ref={ß.mount((node) => {
                let timer: number;
                const outputListener = codemirrorView.EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        clearTimeout(timer);
                        timer = window.setTimeout(async() => {
                            if (ready === false) {return}
                            setReady(false);
                            setOutput(await compile(update.state.doc.toString()));
                            setReady(true);
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
                                    overflow: "hidden"
                                },
                                ".cm-content": {
                                    caretColor: "#ffffff"
                                },
                                ".cm-cursor": {
                                    borderLeftColor: "#ffffff"
                                },
                                ".cm-activeLine": {
                                    backgroundColor: "#111111"
                                },
                                ".cm-lineNumbers": {
                                    backgroundColor: "#111111",
                                    color: "#333333",
                                    width: "4ch",
                                    textAlign: "right"
                                },
                                ".cm-scroller": {
                                    scrollbarWidth: "none"
                                }
                            }, 
                            {
                                dark: true
                            }
                        ),
                        outputListener,
                        codemirrorView.lineNumbers(),
                        codemirrorView.highlightActiveLine(),
                        codemirrorCommands.history(),
                        codemirrorView.EditorView.lineWrapping
                    ]
                });
                if (!editor) {
                    new codemirrorView.EditorView({state: temporalState, parent: node});
                    setEditor(true);
                }
            })}></div>
            <div id="Wrapper">
                <$Suspense id="Suspense" show={ready}>
                    <div id="Output" ref={ß.mount(async(node) => await render(output, node, true))}></div>
                </$Suspense>
            </div>
        </div>
    )
}

// MATHSYS -> COMPILE
export async function compile(code: string): Promise<string> {
    return (await $.curl<MathsysCompileRequest, MathsysCompileResponse>("mathsys/compile", {Mcode: code})).output;
}

// MATHSYS -> KATEX
export function render(code: string, element: HTMLElement, display: boolean): void {
    element.textContent = code;
    katex(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: display}
        ],
        strict: false,
        throwOnError: false
    })
}
