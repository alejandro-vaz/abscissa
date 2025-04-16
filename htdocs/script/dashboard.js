// CONNECT TO RANDOM ELEMENTS
const randomContent = document.getElementById("randomContent");
const randomTry = document.getElementById("random-try");
const randomSkip = document.getElementById("random-skip");

// CONNECT TO DAY ELEMENTS
const dayContent = document.getElementById("dayContent");
const dayTry = document.getElementById("day-try");

// CONNECT TO RESOURCES
const resources = document.getElementById("resources-links")

// FUNCTION TO loadProblem A PROBLEM IN A DIV
function loadProblem(div, script) {
    fetchAPI(script).then(data => {
        fetchAPI(`location.php?lang=en&id=${data.id}`).then(location => {
        // GET PROBLEM DATA
        let problem = JSON.parse(data.data_en)
        // ADD ATTRIBUTES
        div.location = location;
        // ERASE PREVIOUS DATA
        div.innerHTML = "";
        // CREATE SECTIONS
        const content1 = document.createElement("div")
        const content2 = document.createElement('div')
        content1.className = "content1"
        content2.className = "content2"
        div.appendChild(content1)
        div.appendChild(content2)
        // ADD NAME
        const contentHeader = document.createElement('h2');
        contentHeader.className = "contentTitle"
        contentHeader.innerHTML = data["name_" + "en"];
        content1.appendChild(contentHeader);
        // PARSE INSTRUCTIONS
        const contentInstructions = document.createElement('div');
        contentInstructions.className = "contentInstructions";
        contentInstructions.innerHTML = problem.instructions;
        content1.appendChild(contentInstructions);
        // CONTENT 2 CARD: LOCATION
        const contentLocation = document.createElement("p");
        contentLocation.className = "contentCard";
        contentLocation.id = "content-location"
        contentLocation.innerHTML = `${location.tree.value}${location.cluster.value}@${location.node.value}`;
        content2.appendChild(contentLocation);
        // CONTENT 2 CARD: ID
        const contentId = document.createElement("p");
        contentId.className = "contentCard";
        contentLocation.id = "content-id"
        contentId.innerHTML = "#" + data.id;
        content2.appendChild(contentId)
        })
    })
}

// FUNCTION TO loadProblem RESOURCES
function loadResources(times) {
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
loadProblem(randomContent, "problems.php?lang=en&context=random");
loadProblem(dayContent, "problems.php?lang=en&context=day");
loadResources(5);

// SKIP RANDOM
randomSkip.addEventListener("click", function() {
    loadProblem(randomContent, "problems.php?lang=en&context=random");
})

// TRY BUTTONS
randomTry.addEventListener("click", function() {
    redirect(`problem.php?id=${randomContent.location.id.value}&lang=en`);
})
dayTry.addEventListener("click", function() {
    redirect(`problem.php?id=${dayContent.location.id.value}&lang=en`);
})

// INFINITE HORIZONTAL SCROLL FOR RESOURCES
let loading = false;
resources.addEventListener("scroll", function() {
    if (resources.scrollLeft + resources.clientWidth >= resources.scrollWidth - 500 && !loading) {
        loading = true;
        loadResources(5);
        setTimeout(() => {
            loading = false;
        }, 500);
    }
})