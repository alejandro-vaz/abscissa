"use strict";

/*                                                                           */
/* CONNECTIONS                                                               */
/*                                                                           */

// CONNECTIONS -> RANDOM ELEMENTS
var randomContent = document.getElementById("random-content");
var randomOptions = document.getElementById("random-options");

// CONNECTIONS -> DAY ELEMENTS
var dayContent = document.getElementById("day-content");
var dayOptions = document.getElementById("day-options");

// CONNECTIONS -> RESOURCES
var resources = document.getElementById("resources-links");

/*                                                                           */
/* LOADING DEFINITIONS                                                       */
/*                                                                           */

// LOADING DEFINITIONS -> PROBLEM
function loadProblem(div, options, post) {
  curl("problems", post).then(function (data) {
    curl("location", {
      "LANG": post.LANG,
      "PROBLEM": data.problem
    }).then(function (location) {
      // GET PROBLEM DATA
      var problem = JSON.parse(data.data_en);
      // ERASE PREVIOUS DATA
      div.innerHTML = "";
      options.innerHTML = "";
      // CREATE SECTIONS
      var content1 = document.createElement("div");
      var content2 = document.createElement('div');
      content1.className = "content1";
      content2.className = "content2";
      div.appendChild(content1);
      div.appendChild(content2);
      // ADD NAME
      var contentHeader = document.createElement('h3');
      contentHeader.className = "contentTitle";
      contentHeader.innerHTML = data["name_" + "en"];
      content1.appendChild(contentHeader);
      // PARSE INSTRUCTIONS
      var contentInstructions = document.createElement('div');
      contentInstructions.className = "contentInstructions";
      contentInstructions.innerHTML = problem.instructions;
      content1.appendChild(contentInstructions);
      // CONTENT 2 CARD: LOCATION
      var contentLocation = document.createElement("p");
      contentLocation.className = "contentCard";
      contentLocation.innerHTML = "".concat(location.tree.value).concat(location.cluster.value, "@").concat(location.node.value);
      content2.appendChild(contentLocation);
      // CONTENT 2 CARD: ID
      var contentId = document.createElement("p");
      contentId.className = "contentCard";
      contentId.innerHTML = "#" + data.problem;
      content2.appendChild(contentId);
      // TRY BUTTON
      var tryButton = document.createElement('button');
      tryButton["class"] = "inputButton";
      tryButton.id = options.id === "random-options" ? "random-try" : "day-try";
      tryButton.innerHTML = "TRY";
      options.appendChild(tryButton);
      tryButton.addEventListener("click", function () {
        redirect("problem?problem=".concat(location.problem.value, "&lang=en"));
      });
      // SKIP BUTTON
      if (options.id === "random-options") {
        var skipButton = document.createElement('button');
        skipButton["class"] = "inputButton";
        skipButton.id = "random-skip";
        skipButton.innerHTML = "SKIP";
        options.appendChild(skipButton);
        skipButton.addEventListener("click", function () {
          loadProblem(div, options, post);
        });
      }
    });
  });
}

// LOADING DEFINITIONS -> RESOURCES
function loadResources(times) {
  curl("resources", {
    "LANG": "en",
    "CONTEXT": "video"
  }).then(function (videos) {
    for (var iteration = 0; iteration < times; iteration++) {
      var video = document.createElement("iframe");
      video.src = videos[Math.floor(Math.random() * videos.length)].link;
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      video.referrerPolicy = "strict-origin-when-cross-origin";
      video.allowFullscreen = true;
      resources.appendChild(video);
    }
  });
}

/*                                                                           */
/* RENDER                                                                    */
/*                                                                           */

// RENDER -> STARTING CONTENT
loadProblem(randomContent, randomOptions, {
  "LANG": "en",
  "CONTEXT": "random"
});
loadProblem(dayContent, dayOptions, {
  "LANG": "en",
  "CONTEXT": "day"
});
loadResources(5);

// RENDER -> INFINITE SCROLL FOR RESOURCES
var loading = false;
resources.addEventListener("scroll", function () {
  if (resources.scrollLeft + resources.clientWidth >= resources.scrollWidth - 500 && !loading) {
    loading = true;
    loadResources(5);
    setTimeout(function () {
      loading = false;
    }, 500);
  }
});

// PLACEHOLDER
function tryreactnowplease() {
  return /*#__PURE__*/React.createElement("button", null, "TRY");
}