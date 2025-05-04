/*                                                                           */
/* CONNECTIONS                                                               */
/*                                                                           */

// CONNECTIONS -> RANDOM ELEMENTS
const randomContent = document.getElementById("random-content");
const randomOptions = document.getElementById("random-options");

// CONNECTIONS -> DAY ELEMENTS
const dayContent = document.getElementById("day-content");
const dayOptions = document.getElementById("day-options");

// CONNECTIONS -> RESOURCES
const resources = document.getElementById("resources-links")


/*                                                                           */
/* LOADING DEFINITIONS                                                       */
/*                                                                           */

// LOADING DEFINITIONS -> PROBLEM
function loadProblem(div, options, post) {
    curl("problems", post).then(data => {
        curl("location", { "LANG": post.LANG, "PROBLEM": data.problem }).then(location => {
            // GET PROBLEM DATA
            let problem = JSON.parse(data.data_en)
            // ERASE PREVIOUS DATA
            div.innerHTML = "";
            options.innerHTML = "";
            // CREATE SECTIONS
            const content1 = document.createElement("div")
            const content2 = document.createElement('div')
            content1.className = "content1"
            content2.className = "content2"
            div.appendChild(content1)
            div.appendChild(content2)
            // ADD NAME
            const contentHeader = document.createElement('h3');
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
            content2.appendChild(contentId);
            // TRY BUTTON
            const tryButton = document.createElement('button');
            tryButton.class = "inputButton";
            tryButton.id = options.id === "random-options" ? "random-try" : "day-try";
            tryButton.innerHTML = "TRY";
            options.appendChild(tryButton);
            tryButton.addEventListener("click", function() {
                redirect(`problem?problem=${location.problem.value}&lang=en`);
            })
            // SKIP BUTTON
            if (options.id === "random-options") {
                const skipButton = document.createElement('button');
                skipButton.class = "inputButton";
                skipButton.id = "random-skip";
                skipButton.innerHTML = "SKIP";
                options.appendChild(skipButton);
                skipButton.addEventListener("click", function() {
                    loadProblem(div, options, post)
                })
            }
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
loadProblem(randomContent, randomOptions, { "LANG": "en", "CONTEXT": "random" });
loadProblem(dayContent, dayOptions, { "LANG": "en", "CONTEXT": "day" });
loadResources(5);

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