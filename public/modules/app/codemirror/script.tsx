//
//  HEAD
//

// HEAD -> MODULES
import * as CodemirrorAutocomplete from '@codemirror/autocomplete';
import * as CodemirrorSetup from 'codemirror';
import * as CodemirrorState from '@codemirror/state';
import * as CodemirrorView from '@codemirror/view';
import * as General from "../../../content/general.js";
import * as TeX from "lang-tex";


//                                                                            
//  CODEMIRROR                                                                
//                                                                            

// CODEMIRROR -> SETUP
export function setup(): CodemirrorView.EditorView {
    const editor = General.connect("editor");
    return new CodemirrorView.EditorView({
        state: CodemirrorState.EditorState.create({
        doc: `% Sample LaTeX
\\documentclass{article}
\\begin{document}
Hello, \\LaTeX!
\\end{document}`,
        extensions: [
            CodemirrorSetup.basicSetup,
            CodemirrorAutocomplete.autocompletion(),
            TeX.texSyntax() as CodemirrorState.Extension,
            CodemirrorView.EditorView.theme({
                "&": { 
                    height: "100vh", fontFamily: "monospace" 
                }
            })
        ]
    }),
        parent: editor
    });
}