/*                                                                           */
/* USER                                                                      */
/*                                                                           */

// USER -> CONNECTIONS
const userDiv = document.getElementById("user")
const userName = document.getElementById("user-name");
const insight = document.getElementById("user-insight");

// USER -> LOAD INFORMATION
if (verify()) {
    curl("users", {}).then(user => {
        // USER DATA DISPLAY
        userName.innerText = user.username;
        insight.innerText = user.role;
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