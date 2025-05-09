/*                                                                           */
/* USER                                                                      */
/*                                                                           */

// USER -> CONNECTIONS
const userDiv = document.getElementById("user")

// USER -> LOAD INFORMATION
validate().then(authenticated => {
    if (authenticated) {
        curl("users", {}).then(user => {
            // USER INSIGHT DISPLAY
            const userInsight = document.createElement("p");
            userInsight.id = 'user-insight';
            userInsight.innerText = user.role;
            userDiv.appendChild(userInsight);
            // USER NAME DISPLAY
            const userName = document.createElement("p");
            userName.id = 'user-name';
            userName.innerText = user.username;
            userDiv.appendChild(userName)
            // PREFERENCES LOGO
            const preferencesLogo = document.createElement('img');
            preferencesLogo.src = "public/svg/preferences.svg";
            preferencesLogo.className = "userIcon";
            preferencesLogo.id = "preferences-logo";
            userDiv.appendChild(preferencesLogo);
            // PREFERENCES REDIRECTS TO PREFERENCES
            preferencesLogo.addEventListener("click", function() {
                redirect("preferences");
            })
        })
    } else {
        // USER LOGO
        const userLogo = document.createElement('img');
        userLogo.src = "public/svg/user.svg";
        userLogo.className = "userIcon";
        userLogo.id = "user-logo";
        userDiv.appendChild(userLogo);
        // USER REDIRECTS TO AUTH
        userLogo.addEventListener("click", function() {
            redirect("auth");
        })
    }
})
