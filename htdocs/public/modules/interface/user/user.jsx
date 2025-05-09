/*                                                                           */
/* USER                                                                      */
/*                                                                           */

// USER -> CONNECTIONS
const userDiv = document.getElementById("user")

// USER -> LOAD INFORMATION
validate().then(authenticated => {
    if (authenticated) {
        curl("users", {}).then(user => {
            ReactDOM.createRoot(userDiv).render(
                <>
                    <p id="user-insight">{user.role}</p>
                    <p id="user-name">{user.username}</p>
                    <img src="public/svg/preferences.svg" class="userIcon" id="preferences-logo" onClick={() => redirect("preferences")}/>
                </>
            )
        })
    } else {
        ReactDOM.createRoot(userDiv).render(
            <>
                <img src="public/svg/user.svg" class="userIcon" id="user-logo" onClick={() => redirect('auth')}/>
            </>
        )
    }
})