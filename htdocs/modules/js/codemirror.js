// CODEMIRROR TEXTAREA
function renderCodeMirror(element) {
    var editor = CodeMirror.fromTextArea(element, {
        // OPTIONS
        mode: 'stex',
        lineNumbers: true,
        theme: 'monokai',
        indentWithTabs: true,
        autocorrect: true,
        spellcheck: false,
        smartIndent: true,
        lineWrapping: true,
        indentUnit: 4,
        lineWiseCopyCut: false,
        // BREAK AUTOCOMPLETION
        extraKeys: {
            "Enter": function(cm) {
                const doc = cm.getDoc();
                const cursor = doc.getCursor();
                const line = doc.getLine(cursor.line);
                const ch = cursor.ch;
                if (line.slice(ch - 2, ch) !== "\\\\") {
                    cm.operation(function() {
                        cm.replaceSelection("\\\\");
                        doc.setCursor({ line: cursor.line + 1, ch: 0 });
                    })
                }
                cm.execCommand("newlineAndIndent");
                return true;
            },
        }
    });
    return editor;
}