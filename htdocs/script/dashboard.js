// CONNECT TO RANDOM ELEMENTS
const randomContent = document.getElementById("randomContent");
const randomTry = document.getElementById("randomTry");
const randomSkip = document.getElementById("randomSkip");

// CONNECT TO DAY ELEMENTS
const dayContent = document.getElementById("dayContent");
const dayTry = document.getElementById("dayTry");

// CONNECT TO RESOURCES
const resources = document.getElementById("resourcesLinks")

// FUNCTION TO LOAD A PROBLEM IN A DIV
function load(div, script) {
    fetchAPI(script).then(data => {
        let problem = JSON.parse(data.data_en)
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
        contentHeader.innerHTML = `<span class="text-light">(#${data.id})</span> ${problem.name}`;
        content1.appendChild(contentHeader);
        // PARSE INSTRUCTIONS
        const contentInstructions = document.createElement('div');
        contentInstructions.className = "content-instructions";
        contentInstructions.innerHTML = problem.instructions;
        content1.appendChild(contentInstructions);
        // COURSE EQUIVALENCY
        const contentCourse = document.createElement('p');
        contentCourse.className = "content-course";
        contentCourse.innerHTML = problem.course;
        content2.appendChild(contentCourse);
        // REWARD RATE
        const contentReward = document.createElement('p');
        contentReward.className = "content-reward";
        contentReward.innerHTML = `Reward: ${Math.round(problem.reward * 100)}%`;
        content2.appendChild(contentReward);
    })
}

// FUNCTION TO LOAD RESOURCES
async function charge(times) {
    const videos = await fetchAPI("resources.php?lang=en&type=video")
    for (let iteration = 0; iteration < times; iteration++) {
        const video = document.createElement("iframe");
        video.src = videos[Math.floor(Math.random() * videos.length)].link;
        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        video.referrerPolicy = "strict-origin-when-cross-origin";
        video.allowFullscreen = true;
        resources.appendChild(video);
    }
}

// INITIALIZE
load(randomContent, "problems.php?lang=en&context=random");
load(dayContent, "problems.php?lang=en&context=day");
charge(5);

// SKIP RANDOM
randomSkip.addEventListener("click", function() {
    load(randomContent, "problems.php?lang=en&context=random")
})

