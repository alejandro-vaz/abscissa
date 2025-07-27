//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";
import * as Popup from "../../app/popup/script.js";
import * as Dicebear from "../../app/dicebear/script.js";

// HEAD -> INTERFACE NAVBAR
const origin = await General.connect("InterfaceNavbar");


//
//  NAVBAR
//

// NAVBAR -> DISPLAY STATUS
let navbarState = true;

// NAVBAR -> OPENER FUNCTION
async function alternate(event) {
    let navbarStateChange;
    if (navbarState) {
        navbarStateChange = !(event.clientX <= window.innerWidth * 0.06)
    } else {
        navbarStateChange = event.clientX <= window.innerWidth * 0.01;
    }
    if (navbarStateChange) {
        navbarState = !navbarState
        if (navbarState) {
            origin.style.left = "1vw"
        } else {
            origin.style.left = "-3.5vw"
        }
    }
}

// NAVBAR -> ACTIVATE
export async function activate(): Promise<void> {
    navbarState = true;
    const validate = await General.curl("session/validate", {});
    let user;
    if (validate) {
        user = await General.curl("user/data", {});
    }
    await General.inject(origin,
        <>
            <div id="Container">
                <img 
                    src="/public/svg/logo_light.svg" 
                    className="icon" 
                    onClick={() => General.redirect("/dashboard")}
                    tooltip="Go to dashboard"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/search.svg" 
                    className="icon" 
                    onClick={() => General.redirect("/search")}
                    tooltip="Go to search"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/playground.svg" 
                    className="icon" 
                    onClick={() => General.redirect("/playground")}
                    tooltip="Go to playground"
                />
                <img 
                    src="/public/modules/interface/navbar/svg/stats.svg" 
                    className="icon" 
                    onClick={() => General.redirect("/stats")}
                    tooltip="Go to stats"
                />
                <img 
                    src={validate ? Dicebear.identicon(user.Uname) : "/public/modules/interface/navbar/svg/user.svg" }
                    className="icon" 
                    onClick={() => validate ? General.redirect("/user") : Popup.create("auth")}
                    tooltip={validate ? "Go to your profile" : "Log in or register"}
                />
                <img 
                    src="/public/modules/interface/navbar/svg/settings.svg" 
                    className="icon" 
                    onClick={() => General.redirect("/settings")}
                    tooltip="Go to settings"
                />
            </div>
        </>
    )
    window.addEventListener('mousemove', alternate)
}

// NAVBAR -> DEACTIVATE
export async function deactivate(): Promise<void> {
    window.removeEventListener('mousemove', alternate);
    General.inject(origin, <></>);
}