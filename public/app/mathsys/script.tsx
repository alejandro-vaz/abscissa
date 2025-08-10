//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import katex from "€katex/contrib/auto-render";
import * as codemirrorState from '€@codemirror/state';
import * as codemirrorView from '€@codemirror/view';
import * as codemirrorCommands from '€@codemirror/commands';


//
//  MATHSYS
//

// RENDER -> MATHSYS EXIT
class MathsysExit extends Error {
    constructor(public exitCode: number) {
        super(`Mathsys halted with code ${exitCode}`);
        this.name = "MathsysExit";
    }
}

// MATHSYS -> PLAYGROUND
export async function playground(text: string, parent: HTMLElement, output: HTMLElement): Promise<codemirrorView.EditorView> {
    let timer;
    const outputListener = codemirrorView.EditorView.updateListener.of((update) => {
        if (update.docChanged) {
            clearTimeout(timer);
            timer = setTimeout(async() => {
                await view(update.state.doc.toString(), output);
            }, 100);
        }
    })
    const state = codemirrorState.EditorState.create({
        doc: text,
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
    })
    await view(state.doc.toString(), output);
    return new codemirrorView.EditorView({
        state: state,
        parent: parent
    })
}

// MATHSYS -> VIEW
export async function view(code: string, element: HTMLElement): Promise<void> {
    const result = await $.curl("mathsys/view", {Mcode: code}) as string | boolean;
    if (result !== false) {
        element.textContent = result as string;
        katex(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: true}
            ],
            strict: false,
            throwOnError: false,
        });
    }
}

// MATHSYS -> COMPILE
export async function run(code: string): Promise<string> {
    const output = [];
    let runtime: WebAssembly.Instance;
    runtime = (await WebAssembly.instantiate(
        await WebAssembly.compile(await $.stream("mathsys/compile", {Mcode: code})),
        {
            env: {},
            sys: {
                call1: (pointer, length) => {
                    output.push(new TextDecoder("utf-8").decode(
                        new Uint8Array((runtime.exports.memory as WebAssembly.Memory).buffer, pointer, length)
                    ));
                },
                call60: (exitCode) => {
                    throw new MathsysExit(exitCode);
                }
            }
        }
    ));
    try {
        (runtime.exports._start as Function)();
    } catch (error) {
        if (error instanceof MathsysExit) {
            output.push(`Mathsys exited with code ${error.exitCode}.`)
        } else {
            throw error;
        }
    }
    return output.join("");
}