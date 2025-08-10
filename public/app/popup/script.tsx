//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";

// HEAD -> COMPONENTS
import $Button from "ßButton";
import $SVGIcon from "ßSVGIcon";
import $WordAppearText from "ßWordAppearText";

// HEAD -> APP POPUP
const origin = await $.connect("AppPopup");


//
//  PRESETS
//

// PRESETS -> AUTH
function $Auth({initialState}: {initialState: boolean}) {
    const [mode, setMode] = ß.useState(initialState);
    const [disabled, setDisabled] = ß.useState(false);
    return (
        <>
            <div id="Auth">
                <h2 id="Title">{mode ? "Log in" : "Register"}</h2>
                <form id="Form" noValidate onSubmit={async(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget as HTMLFormElement);
                    setDisabled(true);
                    switch (mode) {
                        case true: {
                            $.debug($.SUG.PAT);
                            if (!(
                                $.check(data.get("username") as string, $.SUG.PAT.Uname) &&
                                $.check(data.get("password") as string, $.SUG.PAT.Uhashpass)
                            )) {break}
                            if (await $.curl("user/login", {
                                Uname: data.get("username"),
                                Uhashpass: data.get("password"),
                            })) {
                                window.location.reload();
                            }
                        }
                        case false: {
                            if (!(
                                $.check(data.get("username") as string, $.SUG.PAT.Uname) &&
                                $.check(data.get("email") as string, $.SUG.PAT.Uemail) &&
                                $.check(data.get("password") as string, $.SUG.PAT.Uhashpass)
                            )) {break}
                            if (await $.curl("user/register", {
                                Uname: data.get("username"),
                                Uemail: data.get("email"),
                                Uhashpass: data.get("password"),
                            })) {
                                setMode(!mode);
                            }
                        }
                    }
                    setDisabled(false);
                }}>
                    <input id="Username" type="text" name="username" placeholder="username..." autoComplete="off"/>
                    {!mode && <input id="Email" type="email" name="email" placeholder="email..." autoComplete="off"/>}
                    <input id="Password" type="password" name="password" placeholder="password..." autoComplete="off"/>
                    <input
                        id="Submit"
                        type="submit"
                        value={mode ? "Log in" : "Register"}
                        tooltip={mode ? "Log in" : "Register"}
                        disabled={disabled}
                    />
                    {!mode && <$WordAppearText text="By signing up you accept our privacy policy." id="Agreement"/>}
                </form>
                <$Button
                    text={mode ? "Don't have an account?" : "Already have an account?"}
                    id="Change"
                    onClick={() => setMode(!mode)}
                    tooltip={mode ? "Register instead" : "Already have an account?"}
                />
            </div>
        </>
    )
};
//https://www.termsfeed.com/live/76431b8a-3dd4-49ce-a030-9ed43aeb7300

//
//  POPUP
//

// POPUP -> CREATE
export async function create(preset: string, ...presetArguments: any[]): Promise<void> {
    let content;
    switch (preset) {
        case "auth": content = <$Auth initialState={presetArguments[0]}/>;
    }
    await ß.inject(origin,
        <>
            <div id="Window">
                <div id="Header">
                    <$SVGIcon
                        path="/public/app/popup/svg/close.svg"
                        id="Close"
                        onClick={() => remove()}
                        tooltip="Close window"
                    />
                </div>
                {content}
            </div>
        </>
    )
    origin.style.pointerEvents = "auto";
    origin.style.opacity = "1";
}

// POPUP -> REMOVE
export async function remove(): Promise<void> {
    origin.style.opacity = "0";
    origin.style.pointerEvents = "none";
    await $.delay(0.1);
    await ß.inject(origin, <></>);
}