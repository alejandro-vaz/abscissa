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
            let problem = JSON.parse(data.data_en)
            ReactDOM.createRoot(div).render(
                <>
                    <div class="content1">
                        <h3 class="contentTitle">{data["name_" + "en"]}</h3>
                        <div class="contentInstructions">{problem.instructions}</div>
                    </div>
                    <div class="content2">
                        <p class="contentCard">{`${location.tree.value}${location.cluster.value}@${location.node.value}`}</p>
                        <p class="contentCard">{"#" + data.problem}</p>
                    </div>
                </>
            )
            ReactDOM.createRoot(options).render(
                <>
                    <button class="inputButton" onClick={() => redirect(`problem?problem=${location.problem.value}&lang=en`)}>TRY</button>
                    {options.id === "random-options" ? 
                        <button class="inputButton" onClick={() => loadProblem(div, options, post)}>SKIP</button>
                    : null}
                </>
            )
        })
    })
}

// LOADING DEFINITIONS -> RESOURCES
function loadResources(times) {
    curl("resources", { "LANG": "en", "CONTEXT": "video" }).then(videos => {
        ReactDOM.createRoot(resources).render(
            <>
                {Array.from({ length: times }).map((time1, time2) => {
                    return <iframe
                        src={videos[Math.floor(Math.random() * videos.length)].link}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullscreen={true}
                    ></iframe>
                })}
            </>
        )
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