// CONNECT TO ELEMENTS
const userDiv = document.getElementById("user")
const userName = document.getElementById("user-name");
const insight = document.getElementById("user-insight");

// INFO
if (getCookie("user")) {
    // COOKIE
    const data = getCookie("user");
    userName.innerText = data.name;
    insight.innerText = data.insight;
    // PREFERENCES LOGO
    const preferencesLogo = document.createElement('img');
    preferencesLogo.src = "../public/preferences.svg";
    preferencesLogo.className = "userIcon";
    preferencesLogo.id = "preferences-logo";
    userDiv.appendChild(preferencesLogo);
    // PREFERENCES REDIRECTS TO PREFERENCES
    preferencesLogo.addEventListener("click", function() {
        redirect("preferences.php");
    })
} else {
    // USER LOGO
    const userLogo = document.createElement('img');
    userLogo.src = "../public/user.svg";
    userLogo.className = "userIcon";
    userLogo.id = "user-logo";
    userDiv.appendChild(userLogo);
    // USER REDIRECTS TO AUTH
    userLogo.addEventListener("click", function() {
        redirect("auth.php");
    })
}