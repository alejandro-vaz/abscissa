//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as $ from "$";
/* @ts-ignore */import * as DiceBear from "#dicebear";
/* @ts-ignore */import * as Popup from "#popup";

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
                    tooltip="Go to dashboard"
                />
                <img 
                    src="/public/interface/navbar/svg/search.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/search", true)}
                    tooltip="Go to search"
                />
                <img 
                    src="/public/interface/navbar/svg/playground.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/playground", true)}
                    tooltip="Go to playground"
                />
                <img 
                    src="/public/interface/navbar/svg/stats.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/stats", true)}
                    tooltip="Go to stats"
                />
                <img 
                    src={validate ? DiceBear.identicon(user.Uname) : "/public/interface/navbar/svg/user.svg" }
                    className="icon" 
                    onClick={() => validate ? $.redirect("/user", true) : Popup.create("auth")}
                    tooltip={validate ? "Go to your profile" : "Log in or register"}
                />
                <img 
                    src="/public/interface/navbar/svg/settings.svg" 
                    className="icon" 
                    onClick={() => $.redirect("/settings", true)}
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