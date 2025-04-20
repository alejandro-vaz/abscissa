/*                                                                           */
/* RENDER                                                                    */
/*                                                                           */

// RENDER -> CONNECT TO ELEMENTS
let playground = document.getElementById("playground");
const visor = document.getElementById("visor");
const instructions = document.getElementById("instructions");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const validate = document.getElementById("validate");
const calculatorLinks = {
    "basic": {
        "ClassCalc": '<iframe src="https://app.classcalc.com/prod/embed?linkId=PL7HJaN2jPopAEjE9&hide#/basic" width="450px" height="600px" frameborder=0 \\>'
    }
}

// RENDER -> CONNECT TO CODEMIRROR
playground = renderCodeMirror(playground);

// RENDER -> LOAD PROBLEM
curl("problems", { "ID": getURLParameter("id"), "LANG": "en" }).then(data => {
    curl("location", { "ID": getURLParameter("id"), "LANG": "en" }).then(location => {
        // GET PROBLEM DATA
        let problem = JSON.parse(data.data_en);
        // SAVE ATTRIBUTES
        result.dataset.pre = problem.pre;
        result.dataset.post = problem.post;
        // CREATE TITLE
        const header = document.createElement("h2");
        header.innerHTML = data["name_" + "en"];
        document.getElementById("info").appendChild(header);
        // INSTRUCTIONS TITLE
        const instructionsHeader = document.createElement("h3");
        instructionsHeader.textContent = "Instructions";
        instructions.appendChild(instructionsHeader);
        // PARSE INSTRUCTIONS
        const instructionsText = document.createElement("div");
        instructionsText.innerHTML = problem.instructions;
        instructions.appendChild(instructionsText);
        // SET UP PLAYGROUND
        playground.setValue(problem.playgroundDefault);
        visor.textContent = problem.playgroundDefault;
        renderLaTeX(visor);
        // RUN RESULT
        result.textContent = problem.pre + problem.post;
        renderLaTeX(result);
        // VALIDATE RESULT
        validate.addEventListener("click", function() {
            if (problem.numerical) {
                if (((problem.answer[0] * (1 - problem.answer[1]) <= +answer.value) && (problem.answer[0] * (1 + problem.answer[1]) >= +answer.value) && (problem.answer[0] >= 0)) || ((problem.answer[0] * (1 - problem.answer[1]) >= +answer.value) && (problem.answer[0] * (1 + problem.answer[1]) <= +answer.value) && (problem.answer[0] <= 0))) {
                    alert("OK")
                } else {
                    alert("X")
                }
            } else {
                const index = problem.answer.findIndex(
                    element => rawLaTeX(element) === rawLaTeX(answer.value)
                );
                if (index !== -1) {
                    alert("OK");
                } else {
                    alert("BAD");
                }
            }
        })
    })
});


/*                                                                           */
/* DYNAMIC                                                                   */
/*                                                                           */

// DYNAMIC -> ANSWER AUTOCOMPLETION
const brackets = { '[': ']', '(': ')', '{': '}' };
answer.addEventListener('keydown', function(pressed) {
    if (brackets[pressed.key]) {
        pressed.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const text = this.value;
        this.value = text.slice(0, start) + pressed.key + brackets[pressed.key] + text.slice(end);
        this.value = text.slice(0, start) + pressed.key + brackets[pressed.key] + text.slice(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

// DYNAMIC -> RENDER VISOR ON CHANGE
playground.on("change", function(instance) {
    visor.textContent = instance.getValue();
    renderLaTeX(visor);
    visor.scrollTop = visor.scrollHeight;
})

// DYNAMIC -> RENDER ANSWER ON CHANGE
answer.addEventListener("input", function() {
    result.textContent = result.dataset.pre + answer.value + result.dataset.post;
    renderLaTeX(result);
});
