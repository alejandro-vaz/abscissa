// CONNECT TO ELEMENTS
const userName = document.getElementById("userName");
const userInsight = document.getElementById("userInsight");
const preferencesLogo = document.getElementById("preferencesLogo");

// PREFERENCES REDIRECTS TO PREFERENCES
preferencesLogo.addEventListener("click", function() {
    redirect("preferences.php")
})

// MODIFY VALUES
userName.innerText = getCookie("userName");
userInsight.innerText = getCookie("userInsight");