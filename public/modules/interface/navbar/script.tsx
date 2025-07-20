//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";
import * as Popup from "../../app/popup/script.js";

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
    const validate = await General.curl("session/validate", {});
    await General.inject(navbar,
        <>
            <div id="interface-navbar-container">
                <img 
                    src="/public/svg/logo_light.svg" 
                    id="interface-navbar-dashboard" 
                    className="interface-navbar-Icon" 
                    onClick={() => General.redirect("/dashboard")}
                    tooltip="Go to dashboard"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/search.svg" 
                    id="interface-navbar-search" 
                    className="interface-navbar-Icon" 
                    onClick={() => General.redirect("/search")}
                    tooltip="Go to search"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/playground.svg" 
                    id="interface-navbar-playground" 
                    className="interface-navbar-Icon" 
                    onClick={() => General.redirect("/playground")}
                    tooltip="Go to playground"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/stats.svg" 
                    id="interface-navbar-stats" 
                    className="interface-navbar-Icon" 
                    onClick={() => General.redirect("/stats")}
                    tooltip="Go to stats"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/user.svg" 
                    id="interface-navbar-user" 
                    className="interface-navbar-Icon" 
                    onClick={() => validate ? General.redirect("/user") : Popup.create("auth")}
                    tooltip={validate ? "Go to your profile" : "Log in or register"}
                />
                <img 
                    src="/public/modules/interface/navbar/svg/settings.svg" 
                    id="interface-navbar-settings" 
                    className="interface-navbar-Icon" 
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