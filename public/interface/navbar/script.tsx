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
const root = await ß.createRoot("InterfaceNavbar");


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
            root.node.style.left = "1vw"
        } else {
            root.node.style.left = "-3.5vw"
        }
    }
}

// NAVBAR -> ACTIVATE
export async function activate(): Promise<void> {
    navbarState = true;
    const sessionValidate = await $.curl<SessionValidateRequest, SessionValidateResponse>("session/validate", {});
    let userData;
    if (sessionValidate.validated) {
        userData = await $.curl<UserDataRequest, UserDataResponse>("user/data", {});
    }
    await ß.inject(root,
        <div id="Container">
            <$SVGIcon
                path="/public/svg/logoLight.svg"
                id="Dashboard"
                onClick={async() => await $.redirect("/dashboard")}
                onContextMenu={async() => await $.redirect("/dashboard", true, true)}
                data-tooltip="Go to dashboard"
            />
            <$SVGIcon 
                path="/public/interface/navbar/svg/playground.svg" 
                id="Playground"
                onClick={async() => await $.redirect("/playground")}
                onContextMenu={async() => await $.redirect("/playground", true, true)}
                data-tooltip="Go to playground"
            />
            <$SVGIcon 
                path={sessionValidate.validated ? DiceBear.icon(userData.Uname) : "/public/interface/navbar/svg/user.svg"}
                id="User"
                onClick={async() => sessionValidate.validated ? await $.redirect("/user") : Popup.create("auth")}
                onContextMenu={async() => sessionValidate.validated ? await $.redirect("/user", true, true) : Popup.create("auth")}
                data-tooltip={sessionValidate.validated ? "Go to your profile" : "Log in or register"}
            />
        </div>
    );
    window.addEventListener('mousemove', alternate);
}

// NAVBAR -> DEACTIVATE
export async function deactivate(): Promise<void> {
    window.removeEventListener('mousemove', alternate);
    await ß.clean(root);
}