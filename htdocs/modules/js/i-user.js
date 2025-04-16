// CONNECT TO ELEMENTS
const userName = document.getElementById("user-name");
const userInsight = document.getElementById("user-insight");
const preferencesLogo = document.getElementById("preferences-logo");

// PREFERENCES REDIRECTS TO PREFERENCES
preferencesLogo.addEventListener("click", function() {
    redirect("preferences.php")
})

// MODIFY VALUES
userName.innerText = getCookie("userName");
userInsight.innerText = getCookie("userInsight");