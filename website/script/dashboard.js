// CONNECT TO RANDOM ELEMENTS
const randomContent = document.getElementById("randomContent");
const randomTry = document.getElementById("randomTry");
const randomSkip = document.getElementById("randomSkip");

// CONNECT TO DAY ELEMENTS
const dayContent = document.getElementById("dayContent");
const dayTry = document.getElementById("dayTry");

// FUNCTION TO LOAD RANDOM
function random() {
    fetch(`../database/problem_random.php?lang=en`, { cache: "no-store" })
    .then(response => response.json())
    .then(data => {
        // ERASE PREVIOUS DATA
        randomContent.innerHTML = "";
        // CREATE SECTIONS
        const randomContent1 = document.createElement("div")
        const randomContent2 = document.createElement('div')
        randomContent1.className = "content-1"
        randomContent2.className = "content-2"
        randomContent.appendChild(randomContent1)
        randomContent.appendChild(randomContent2)
        // ADD NAME
        const randomContentHeader = document.createElement('h2');
        randomContentHeader.className = "content-title"
        randomContentHeader.innerHTML = `<span class="text-light">(#${data.meta.id})</span> ${data.name}`;
        randomContent1.appendChild(randomContentHeader);
        // PARSE INSTRUCTIONS
        const randomContentInstructions = document.createElement('div');
        randomContentInstructions.className = "content-instructions";
        randomContentInstructions.innerHTML = data.instructions;
        randomContent1.appendChild(randomContentInstructions);
        // COURSE EQUIVALENCY
        const randomContentCourse = document.createElement('p');
        randomContentCourse.className = "content-course";
        randomContentCourse.innerHTML = data.course;
        randomContent2.appendChild(randomContentCourse);
        // REWARD RATE
        const randomContentReward = document.createElement('p');
        randomContentReward.className = "content-reward";
        randomContentReward.innerHTML = `Reward: ${Math.round(data.reward * 100)}%`;
        randomContent2.appendChild(randomContentReward);
    })
}

// FUNCTION TO LOAD DAY
function day() {
    fetch(`../database/problem_of_day.php?lang=en`)
    .then(response => response.json())
    .then(data => {
    // ERASE PREVIOUS DATA
    dayContent.innerHTML = "";
    // CREATE SECTIONS
    const dayContent1 = document.createElement("div")
    const dayContent2 = document.createElement('div')
    dayContent1.className = "content-1"
    dayContent2.className = "content-2"
    dayContent.appendChild(dayContent1)
    dayContent.appendChild(dayContent2)
    // ADD NAME
    const dayContentHeader = document.createElement('h2');
    dayContentHeader.className = "content-title"
    dayContentHeader.innerHTML = `<span class="text-light">(#${data.meta.id})</span> ${data.name}`;
    dayContent1.appendChild(dayContentHeader);
    // PARSE INSTRUCTIONS
    const dayContentInstructions = document.createElement('div');
    dayContentInstructions.className = "content-instructions";
    dayContentInstructions.innerHTML = data.instructions;
    dayContent1.appendChild(dayContentInstructions);
    // COURSE EQUIVALENCY
    const dayContentCourse = document.createElement('p');
    dayContentCourse.className = "content-course";
    dayContentCourse.innerHTML = data.course;
    dayContent2.appendChild(dayContentCourse);
    // REWARD RATE
    const dayContentReward = document.createElement('p');
    dayContentReward.className = "content-reward";
    dayContentReward.innerHTML = `Reward: ${Math.round(data.reward * 100)}%`;
    dayContent2.appendChild(dayContentReward);
    })
}

// INITIALIZE
random()
day()
randomSkip.addEventListener("click", function() {
    random()
})

