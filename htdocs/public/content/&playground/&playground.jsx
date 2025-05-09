/*                                                                           */
/* RENDER                                                                    */
/*                                                                           */

// RENDER -> CONNECT TO ELEMENTS
let editor = document.getElementById("editor");
const visor = document.getElementById("visor");
const calculatorLinks = {
    "basic": {
        "ClassCalc": '<iframe src="https://app.classcalc.com/prod/embed?linkId=PL7HJaN2jPopAEjE9&hide#/basic" width="450px" height="600px" frameborder=0 \\>'
    }
}

// RENDER -> CONNECT TO CODEMIRROR
editor = renderCodeMirror(editor);

// RENDER -> SET DEFAULT CONTENT
editor.setValue("$$  $$");
visor.textContent = "$$  $$";


/*                                                                           */
/* DYNAMIC                                                                   */
/*                                                                           */

// DYNAMIC -> RENDER VISOR ON CHANGE
editor.on("change", function(instance) {
    visor.textContent = instance.getValue();
    renderLaTeX(visor);
    visor.scrollTop = visor.scrollHeight;
})