// CONNECT TO ELEMENTS
let playground = document.getElementById("playground");
const visor = document.getElementById("visor");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const validate = document.getElementById("validate");
const calculatorLinks = {
    "basic": {
        "ClassCalc": '<iframe src="https://app.classcalc.com/prod/embed?linkId=PL7HJaN2jPopAEjE9&hide#/basic" width="450px" height="600px" frameborder=0 \\>'
    }
}

// CONNECT PLAYGROUND TO CODEMIRROR AND REDEFINE IT
playground = renderCodeMirror(playground);

// LOAD PROBLEM
fetchAPI(`problems.php?lang=en&id=${getURLParameter("id")}`).then(data => {
    // GET PROBLEM DATA
    let problem = JSON.parse(data.data_en);
    // SAVE ATTRIBUTES
    result.dataset.pre = problem.pre;
    result.dataset.post = problem.post;
    // CREATE TITLE
    const header = document.createElement("h2");
    header.innerHTML = `<span class="text-light">@${data.node}</span> ${problem.name}`;
    document.getElementById("info").appendChild(header);
    // INSTRUCTIONS TITLE
    const instructionsHeader = document.createElement("h3");
    instructionsHeader.textContent = "Instructions";
    document.getElementById("instructions").appendChild(instructionsHeader);
    // PARSE INSTRUCTIONS
    const instructions = document.createElement("div");
    instructions.innerHTML = problem.instructions;
    document.getElementById("instructions").appendChild(instructions);
    // SET UP PLAYGROUND
    playground.setValue("$$ " + problem.playgroundDefault + " $$");
    visor.textContent = `$$ ${problem.playgroundDefault} $$`;
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
            if (problem.answer.includes(
                answer.value
                .replaceAll("\\right", "")
                .replaceAll("\\left", "")
                .replaceAll("\\cdot", "")
                .replaceAll("{", "")
                .replaceAll("}", "")
                .replaceAll("\\\\", "")
                .replaceAll(" ", "")
                .trim()
            )) {
                alert("OK")
            } else {
                alert("X")
            }
        }
    })
});

// MIRROR PLAYGROUND TO VISOR WITH KATEX ENABLED USING CODEMIRROR
playground.on("change", function(instance, change) {
    visor.textContent = instance.getValue();
    renderLaTeX(visor);
})

// MIRROR ANSWER TO RESULT WITH KATEX ENABLED
answer.addEventListener("input", function() {
    result.textContent = result.dataset.pre + answer.value + result.dataset.post;
    renderLaTeX(result);
});

// ANSWER AUTOCOMPLETION
const brackets = { '[': ']', '(': ')', '{': '}' };
answer.addEventListener('keydown', function(pressed) {
    if (brackets[pressed.key]) {
        pressed.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const text = this.value;
        this.value = text.slice(0, start) + pressed.key + brackets[pressed.key] + text.slice(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});
