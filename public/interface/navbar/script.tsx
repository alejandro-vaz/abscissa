//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";
import * as DiceBear from "#dicebear";
import * as Popup from "#popup";

// HEAD -> COMPONENTS
import $SVGIcon from "ßSVGIcon";

// HEAD -> INTERFACE NAVBAR
const origin = await $.connect("InterfaceNavbar");


//
//  NAVBAR
//

// NAVBAR -> DISPLAY STATUS
let navbarState = true;

// NAVBAR -> OPENER FUNCTION
function alternate(event: MouseEvent) {
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
    await ß.inject(origin,
        <>
            <div id="Container">
                <$SVGIcon
                    path="/public/svg/logoLight.svg"
                    id="Dashboard"
                    onClick={async() => await $.redirect("/dashboard")}
                    onContextMenu={async() => await $.redirect("/dashboard", true, true)}
                    tooltip="Go to dashboard"
                />
                <$SVGIcon 
                    path="/public/interface/navbar/svg/playground.svg" 
                    id="Playground"
                    onClick={async() => await $.redirect("/playground")}
                    onContextMenu={async() => await $.redirect("/playground", true, true)}
                    tooltip="Go to playground"
                />
                <$SVGIcon 
                    path={validate ? DiceBear.icon(user.Uname) : "/public/interface/navbar/svg/user.svg"}
                    id="User"
                    onClick={async() => validate ? await $.redirect("/user") : Popup.create("auth")}
                    onContextMenu={async() => validate ? await $.redirect("/user", true, true) : Popup.create("auth")}
                    tooltip={validate ? "Go to your profile" : "Log in or register"}
                />
            </div>
        </>
    )
    window.addEventListener('mousemove', alternate)
}

// NAVBAR -> DEACTIVATE
export async function deactivate(): Promise<void> {
    window.removeEventListener('mousemove', alternate);
    await ß.inject(origin, <></>);
}