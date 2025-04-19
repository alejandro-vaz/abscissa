// CONNECT TO ELEMENTS
const userName = document.getElementById("user-name");
const userInsight = document.getElementById("user-insight");
const userLogo = document.getElementById("user-logo");
const preferencesLogo = document.getElementById("preferences-logo");

// USER REDIRECTS TO AUTH
userLogo.addEventListener("click", function() {
    redirect("auth.php");
})

// PREFERENCES REDIRECTS TO PREFERENCES
preferencesLogo.addEventListener("click", function() {
    redirect("preferences.php");
})

// MODIFY VALUES
userName.innerText = getCookie("userName");
userInsight.innerText = getCookie("userInsight");