// CONNECT TO RANDOM ELEMENTS
const randomContent = document.getElementById("randomContent");
const randomTry = document.getElementById("randomTry");
const randomSkip = document.getElementById("randomSkip");

// CONNECT TO DAY ELEMENTS
const dayContent = document.getElementById("dayContent");
const dayTry = document.getElementById("dayTry");

// FUNCTION TO LOAD A PROBLEM IN A DIV
function load(div, script) {
    fetchAPI(script).then(data => {
        // ERASE PREVIOUS DATA
        div.innerHTML = "";
        // CREATE SECTIONS
        const content1 = document.createElement("div")
        const content2 = document.createElement('div')
        content1.className = "content-1"
        content2.className = "content-2"
        div.appendChild(content1)
        div.appendChild(content2)
        // ADD NAME
        const contentHeader = document.createElement('h2');
        contentHeader.className = "content-title"
        contentHeader.innerHTML = `<span class="text-light">(#${data.meta.id})</span> ${data.name}`;
        content1.appendChild(contentHeader);
        // PARSE INSTRUCTIONS
        const contentInstructions = document.createElement('div');
        contentInstructions.className = "content-instructions";
        contentInstructions.innerHTML = data.instructions;
        content1.appendChild(contentInstructions);
        // COURSE EQUIVALENCY
        const contentCourse = document.createElement('p');
        contentCourse.className = "content-course";
        contentCourse.innerHTML = data.course;
        content2.appendChild(contentCourse);
        // REWARD RATE
        const contentReward = document.createElement('p');
        contentReward.className = "content-reward";
        contentReward.innerHTML = `Reward: ${Math.round(data.reward * 100)}%`;
        content2.appendChild(contentReward);
    })
}

// INITIALIZE
load(randomContent, "problem_random.php?lang=en")
load(dayContent, "problem_of_day.php?lang=en")
randomSkip.addEventListener("click", function() {
    load(randomContent, "problem_random.php?lang=en")
})

