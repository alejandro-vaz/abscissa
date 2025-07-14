//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";

// HEAD -> CONNECTIONS
const navbar = General.connect("interface-navbar");


//
//  NAVBAR
//

// NAVBAR -> DISPLAY STATUS
let navbarState = true;

// NAVBAR -> OPENER FUNCTION
function alternate(event) {
    let navbarStateChange;
    if (navbarState) {
        navbarStateChange = !(event.clientX <= window.innerWidth * 0.06)
    } else {
        navbarStateChange = event.clientX <= window.innerWidth * 0.01;
    }
    if (navbarStateChange) {
        navbarState = !navbarState
        if (navbarState) {
            navbar.style.left = "1vw"
        } else {
            navbar.style.left = "-3.5vw"
        }
    }
}

// NAVBAR -> ACTIVATE
export async function activate(): Promise<void> {
    navbarState = true;
    General.inject(navbar,
        <>
            <div id="navbar">
                <img 
                    src="/public/svg/logo_light.svg" 
                    id="navbar-dashboard" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/dashboard")}
                    tooltip="Go to dashboard"
                />
                <img 
                    src="/public/svg/search.svg" 
                    id="navbar-search" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/search")}
                    tooltip="Go to search"
                />
                <img 
                    src="/public/svg/playground.svg" 
                    id="navbar-playground" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/playground")}
                    tooltip="Go to playground"
                />
                <img 
                    src="/public/svg/stats.svg" 
                    id="navbar-stats" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/stats")}
                    tooltip="Go to your stats"
                />
                <img 
                    src="/public/svg/user.svg" 
                    id="navbar-user" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/user")}
                    tooltip="Go to your user"
                />
                <img 
                    src="/public/svg/settings.svg" 
                    id="navbar-settings" 
                    className="navbarIcon" 
                    onClick={() => General.redirect("/settings")}
                    tooltip="Go to settings"
                />
            </div>
        </>
    )
    window.addEventListener('mousemove', alternate)
}

// NAVBAR -> DEACTIVATE
export function deactivate(): void {
    window.removeEventListener('mousemove', alternate);
    General.inject(navbar, <></>);
}