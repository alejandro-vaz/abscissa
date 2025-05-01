/*                                                                           */
/* CONNECTIONS                                                               */
/*                                                                           */

// CONNECTIONS -> RANDOM ELEMENTS
const randomContent = document.getElementById("randomContent");
const randomTry = document.getElementById("random-try");
const randomSkip = document.getElementById("random-skip");

// CONNECTIONS -> DAY ELEMENTS
const dayContent = document.getElementById("dayContent");
const dayTry = document.getElementById("day-try");

// CONNECTIONS -> RESOURCES
const resources = document.getElementById("resources-links")


/*                                                                           */
/* LOADING DEFINITIONS                                                       */
/*                                                                           */

// LOADING DEFINITIONS -> PROBLEM
function loadProblem(div, post) {
    curl("problems", post).then(data => {
        curl("location", { "LANG": post.LANG, "PROBLEM": data.problem }).then(location => {
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
            contentId.innerHTML = "#" + data.problem;
            content2.appendChild(contentId)
        })
    })
}

// LOADING DEFINITIONS -> RESOURCES
function loadResources(times) {
    curl("resources", { "LANG": "en", "CONTEXT": "video" }).then(videos => {
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


/*                                                                           */
/* RENDER                                                                    */
/*                                                                           */

// RENDER -> STARTING CONTENT
loadProblem(randomContent, { "LANG": "en", "CONTEXT": "random" });
loadProblem(dayContent, { "LANG": "en", "CONTEXT": "day" });
loadResources(5);

// RENDER -> SKIPPING RANDOM
randomSkip.addEventListener("click", function() {
    loadProblem(randomContent, { "LANG": "en", "CONTEXT": "random" });
})

// RENDER -> TRYING PROBLEMS
randomTry.addEventListener("click", function() {
    redirect(`problem?problem=${randomContent.location.problem.value}&lang=en`);
})
dayTry.addEventListener("click", function() {
    redirect(`problem?problem=${dayContent.location.problem.value}&lang=en`);
})

// RENDER -> INFINITE SCROLL FOR RESOURCES
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