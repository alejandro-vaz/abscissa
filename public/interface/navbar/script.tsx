//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as DiceBear from "#dicebear";
import * as Popup from "#popup";

// HEAD -> INTERFACE NAVBAR
const origin = await $.connect("InterfaceNavbar");


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
            origin.style.left = "1vw"
        } else {
            origin.style.left = "-3.5vw"
        }
    }
}

// NAVBAR -> ACTIVATE
export async function activate(): Promise<void> {
    navbarState = true;
    const validate = await $.curl("session/validate", {});
    let user;
    if (validate) {
        user = await $.curl("user/data", {});
    }
    await $.inject(origin,
        <>
            <div id="Container">
                <img 
                    src="/public/svg/logoLight.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/dashboard", true)}
                    onContextMenu={() => $.redirect("/dashboard", true) && $.redirect("/dashboard", false)}
                    tooltip="Go to dashboard"
                />
                <img 
                    src="/public/interface/navbar/svg/search.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/search", true)}
                    onContextMenu={() => $.redirect("/search", true) && $.redirect("/search", false)}
                    tooltip="Go to search"
                />
                <img 
                    src="/public/interface/navbar/svg/playground.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/playground", true)}
                    onContextMenu={() => $.redirect("/playground", true) && $.redirect("/playground", false)}
                    tooltip="Go to playground"
                />
                <img 
                    src="/public/interface/navbar/svg/stats.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/stats", true)}
                    onContextMenu={() => $.redirect("/stats", true) && $.redirect("/stats", false)}
                    tooltip="Go to stats"
                />
                <img 
                    src={validate ? DiceBear.icon(user.Uname) : "/public/interface/navbar/svg/user.svg" }
                    className="icon" 
                    onClick={() => validate ? $.redirect("/user", true) : Popup.create("auth")}
                    onContextMenu={() => validate ? $.redirect("/user", true) && $.redirect("/user", false) : Popup.create("auth")}
                    tooltip={validate ? "Go to your profile" : "Log in or register"}
                />
                <img 
                    src="/public/interface/navbar/svg/settings.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/settings", true)}
                    onContextMenu={() => $.redirect("/settings", true) && $.redirect("/settings", false)}
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
    await $.inject(origin, <></>);
}