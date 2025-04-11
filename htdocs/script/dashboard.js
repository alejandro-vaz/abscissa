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
        // SAVE CODE AS ATTRIBUTE
        div.dataset.id = data.id;
        // GET PROBLEM DATA
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
        contentHeader.innerHTML = `<span class="text-light">@${data.node}</span> ${problem.name}`;
        content1.appendChild(contentHeader);
        // PARSE INSTRUCTIONS
        const contentInstructions = document.createElement('div');
        contentInstructions.className = "content-instructions";
        contentInstructions.innerHTML = problem.instructions;
        content1.appendChild(contentInstructions);
        // CONTENT 2 CARDS
        const contentId = document.createElement("p");
        contentId.className = "content-id";
        contentId.innerHTML = `#${data.id}`;
        content2.appendChild(contentId)
    })
}

// FUNCTION TO LOAD RESOURCES
function charge(times) {
    fetchAPI("resources.php?lang=en&type=video").then(videos => {
        for (let iteration = 0; iteration < times; iteration++) {
            const video = document.createElement("iframe");
            video.src = videos[Math.floor(Math.random() * videos.length)].link;
            video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            video.referrerPolicy = "strict-origin-when-cross-origin";
            video.allowFullscreen = true;
            resources.appendChild(video);
        }
    })

}

// INITIALIZE
load(randomContent, "problems.php?lang=en&context=random");
load(dayContent, "problems.php?lang=en&context=day");
charge(5);

// SKIP RANDOM
randomSkip.addEventListener("click", function() {
    load(randomContent, "problems.php?lang=en&context=random");
})

// TRY BUTTONS
randomTry.addEventListener("click", function() {
    redirect(`problem.php?id=${randomContent.dataset.id}&lang=en`);
})
dayTry.addEventListener("click", function() {
    redirect(`problem.php?id=${dayContent.dataset.id}&lang=en`);
})