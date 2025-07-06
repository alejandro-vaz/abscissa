//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../general.js";

// HEAD -> CONNECTIONS
const form = General.connect("auth");
const switcher = General.connect("switch-auth");


//
//  FORM
//

// FORM -> HANDLE SUBMISSION
form.addEventListener("submit", async (submission) => {
    submission.preventDefault();
    const data = new FormData(form as HTMLFormElement);
    const response = await General.curl("user/login", {
        Uname: data.get("username"),
        Uhashpass: data.get("password")
    })
    if (response) {
        General.redirect("dashboard");
    }
})

// FORM -> CHANGE TO LOGIN
switcher.addEventListener("click", (click) => {
    General.redirect("register");
})