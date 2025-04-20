/*                                                                           */
/* INITIALIZATION                                                            */
/*                                                                           */

// INITIALIZATION -> CONNECTIONS
const form = document.getElementById("form");
const change = document.getElementById("change");

// INITIALIZATION -> STATE
let login = true;

// INITIALIZATION -> CONTENT
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

// INITIALIZATION -> REGEX PATTERNS
const emailPattern = /^[A-Za-z0-9._%\\-]+@gmail.com$/;
const usernamePattern = /^[A-Za-z0-9_\\-]{4,32}$/
const passwordPattern = /^[A-Za-z0-9_!@#$%^&*()\-=+.]{8,32}$/;


/*                                                                           */
/* FORM                                                                      */
/*                                                                           */

// FORM -> SWITCH MECHANISM
function switchState() {
    form.innerHTML = '';
    login = !login;
    if (login) {
        form.innerHTML = loginForm;
        document.title = "Log in | Abscissa";
        change.innerHTML = "Don't have an account?";
    } else {
        form.innerHTML = registerForm;
        document.title = "Register | Abscissa";
        change.innerHTML = "Already have an account?";
    }
}

// FORM -> INTERCEPTION
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = new FormData(form);
    form.querySelectorAll('div').forEach(div => div.remove());
    if (login) {
        const unique = data.get("unique");
        const password = data.get("password");
        if ((usernamePattern.test(unique) || emailPattern.test(unique)) && passwordPattern.test(password)) {
            if (usernamePattern.test(unique)) {
                curl("auth", {
                    "CONTEXT": "login",
                    "USERNAME": unique,
                    "PASSWORD": password
                }).then(response => {
                    if (response) {
                        redirect("dashboard.php");
                    }
                })
            } else {
                curl("auth", {
                    "CONTEXT": "login",
                    "EMAIL": unique,
                    "PASSWORD": password
                }).then(response => {
                    if (response) {
                        redirect("dashboard.php");
                    }
                })
            } 
        } else {
            const failure = document.createElement('div');
            failure.id = 'failure';
            failure.innerHTML = '<div><p>No matching users.</p></div>';
            form.insertBefore(failure, form.children[1]);
        }
    } else {
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        if (usernamePattern.test(username) && emailPattern.test(email) && passwordPattern.test(password)) {
            curl("auth", {
                "CONTEXT": "register",
                "USERNAME": username,
                "EMAIL": email,
                "PASSWORD": password
            }).then(response => {
                if (response) {
                    switchState();
                    const success = document.createElement('div');
                    success.id = 'success';
                    success.innerHTML = '<div><p>Registration successful.';
                    form.insertBefore(success, form.children[1]);
                } else {
                    const failure = document.createElement('div');
                    failure.id = 'failure';
                    failure.innerHTML = '<div><p>Username or email is already taken.</p></div>';
                    form.insertBefore(failure, form.children[1]);
                }
            });
        } else {
            const failure = document.createElement('div');
            failure.id = 'failure';
            if (!usernamePattern.test(username)) {
                failure.innerHTML = '<div><p>Username criteria:<br>- Must contain 4-32 characters.<br>- Can contain English letters.<br>- Can contain numbers.<br>- Can contain the characters "-" and "_".</p></div>';
            } else if (!emailPattern.test(email)) {
                failure.innerHTML = '<div><p>Email criteria:<br>- Must be a Gmail address.</p></div>';
            } else {
                failure.innerHTML = '<div><p>Password criteria:<br>- Must contain 8-32 characters.<br>- Can contain English letters.<br>- Can contain numbers.<br>- Can contain special characters.</p></div>';
            }
            form.insertBefore(failure, form.children[1]);
        }
    }
})

// FORM -> SWITCH FORM TYPE ON CLICK
change.addEventListener("click", function() {
    switchState();
})
