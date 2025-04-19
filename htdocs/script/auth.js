// CONNECT TO FORM
const form = document.getElementById("form");

// CONNECT TO CHANGE
const change = document.getElementById("change");

// INITIALIZE STATE
let login = true;

// SET FORM DEFAULT CONTENT
const loginForm = `<h1>Log in</h1>
<input type="text" name="unique" id="form-unique" placeholder="username or email" required>
<input type="password" name="password" id="form-password" placeholder="password" required>
<input type="submit" value="Enter">`;
const registerForm = `<h1>Register</h1>
<input type="text" name="username" id="form-username" placeholder="username" required>
<input type="email" name="email" id="form-email" placeholder="email" required>
<input type="password" name="password" id="form-password" placeholder="password" required>
<input type="submit" value="Sign up">`;
form.innerHTML = loginForm;

// PATTERNS
const emailPattern = /^[A-Za-z0-9._%\\-]+@gmail.com$/;
const usernamePattern = /^[A-Za-z0-9_\\-]{4,32}$/
const passwordPattern = /^[A-Za-z0-9_!@#$%^&*()\-=+.]{8,32}$/;

// INTERCEPT FORM SUBMISSION
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = new FormData(form);
    if (login) {
        const unique = data.get("unique");
        const password = data.get("password");
        if ((usernamePattern.test(unique) || emailPattern.test(unique)) && passwordPattern.test(password)) {
            // DO SOMETHING
        } else {
            // DISPLAY ERROR
        }
    } else {
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        if (usernamePattern.test(username) && emailPattern.test(email) && passwordPattern.test(password)) {
            const post = {
                "USERNAME": data.get("username"),
                "EMAIL": data.get("email"),
                "PASSWORD": data.get("password")
            }
            curl("register", post).then(response => {
                if (response) {
                    // SUCCESSFUL OPERATION, AUTOLOGIN
                }
            });
        } else {
            // DISPLAY ERROR
        }
    }
})

// ALTERNATE BETWEEN LOGIN AND REGISTER
change.addEventListener("click", function() {
    // ERASE FORM CONTENT
    form.innerHTML = '';
    // INVERT STATUS
    login = !login
    // REMAKE CONTENT
    if (login) {
        form.innerHTML = loginForm;
        window.name = "Log in | Abscissa";
        change.innerHTML = "Don't have an account?";
    } else {
        form.innerHTML = registerForm;
        window.name = "Register | Abscissa";
        change.innerHTML = "Already have an account?";
    }
})