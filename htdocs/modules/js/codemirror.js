// CODEMIRROR TEXTAREA
function renderCodeMirror(element) {
    var editor = CodeMirror.fromTextArea(element, {
        mode: 'stex',
        lineNumbers: true,
        theme: 'monokai',
        autocorrect: true,
        lineWrapping: true,
        lineWiseCopyCut: false,
        extraKeys: {
            "Enter": function(cm) {
                // BASIC STUFF
                const doc = cm.getDoc();
                const cursor = doc.getCursor();
                const line = doc.getLine(cursor.line);
                const ch = cursor.ch;
                // BREAK AUTOCOMPLETION
                if (line.slice(ch - 2, ch) !== "\\\\") {
                    cm.operation(function() {
                        cm.replaceSelection("\\\\");
                        doc.setCursor({ line: cursor.line + 1, ch: 0 });
                    })
                }
                cm.execCommand("newlineAndIndent");
                return true;
            },
        },
        indentUnit: 4,
        indentWithTabs: true,
        smartIndent: true,
        spellcheck: false
    });
    return editor;
}