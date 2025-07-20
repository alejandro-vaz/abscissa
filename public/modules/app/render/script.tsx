//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import * as General from "../../../content/general.js";
import * as CodemirrorAutocomplete from '@codemirror/autocomplete';
import * as CodemirrorState from '@codemirror/state';
import * as CodemirrorView from '@codemirror/view';
import * as CodemirrorCommands from '@codemirror/commands'
import * as renderKaTeX from "katex/contrib/auto-render";


//
//  RENDER
//

// RENDER -> PLAYGROUND
export function playground(parent: HTMLElement, output: HTMLElement): CodemirrorView.EditorView {
    const outputListener = CodemirrorView.EditorView.updateListener.of((update) => {
        if (update.docChanged) {
            string(update.state.doc.toString(), output);
        }
    })
    const state = CodemirrorState.EditorState.create({
        doc: "var = 3*2 (5 + 2*x - y)",
        extensions: [
            CodemirrorView.keymap.of(CodemirrorCommands.historyKeymap),
            CodemirrorView.EditorView.theme(
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
            CodemirrorView.lineNumbers(),
            CodemirrorView.highlightActiveLine(),
            CodemirrorCommands.history()
        ]
    })
    string(state.doc.toString(), output);
    return new CodemirrorView.EditorView({
        state: state,
        parent: parent
    })
}

// RENDER -> STRING
export async function string(code: string, element: HTMLElement): void {
    element.textContent = await General.curl("mathsys/compile", {Mcode: code});
    renderKaTeX.default(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
        strict: false,
        throwOnError: false,
    });
}