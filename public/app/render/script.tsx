//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as $ from "$";
/* @ts-ignore */import * as codemirrorState from '€@codemirror/state';
/* @ts-ignore */import * as codemirrorView from '€@codemirror/view';
/* @ts-ignore */import * as codemirrorCommands from '€@codemirror/commands';
/* @ts-ignore */import * as katex from "€katex/contrib/auto-render";


//
//  RENDER
//

// RENDER -> PLAYGROUND
export function playground(text: string, parent: HTMLElement, output: HTMLElement): codemirrorView.EditorView {
    const outputListener = codemirrorView.EditorView.updateListener.of((update) => {
        if (update.docChanged) {
            string(update.state.doc.toString(), output);
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
    string(state.doc.toString(), output);
    return new codemirrorView.EditorView({
        state: state,
        parent: parent
    })
}

// RENDER -> STRING
export async function string(code: string, element: HTMLElement): Promise<void> {
    const result = await $.curl("mathsys/compile", {Mcode: code}) as boolean | string;
    if (result != false) {
        element.textContent = result as string;
        katex.default(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ],
            strict: false,
            throwOnError: false,
        });
    }
}